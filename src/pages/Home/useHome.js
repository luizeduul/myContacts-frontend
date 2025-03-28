/* eslint-disable arrow-body-style */
import {
  useCallback, useEffect, useState, useTransition
} from 'react';
import ContactsService from '../../services/ContactsService';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import { toastError, toastSuccess } from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useSafeAsyncState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useSafeAsyncState(false);
  const [hasError, setHasError] = useSafeAsyncState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useSafeAsyncState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useSafeAsyncState(false);

  const [filteredContacts, setFilteredContacts] = useState([]);

  const [isPending, startTransition] = useTransition({
    timeoutMs: 500,
  });

  const loadContacts = useCallback(async () => {
    setIsLoading(true);

    try {
      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);

      setContacts(contactsList);
      setFilteredContacts(contactsList);
    } catch (error) {
      setContacts([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, setContacts, setHasError, setIsLoading]);

  useEffect(() => {
    loadContacts();
    return () => {
      setContacts([]);
    };
  }, [loadContacts, setContacts]);

  // const filteredContacts = useMemo(() => {
  //   return contacts.filter((contact) =>
  //  contact.name.toLowerCase().includes(search.toLowerCase()));
  // }, [contacts, search]);

  const handleChangeOrder = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, [setOrderBy]);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, [setContactBeingDeleted, setIsDeleteModalVisible]);

  const handleDeleteConfirmContact = async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      toastSuccess('Contato deletado com sucesso!');
      setContacts((prevState) => (
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id)
      ));
      handleCloseDeleteModal();
      setContactBeingDeleted(null);
    } catch (error) {
      toastError(error?.message || 'Ocorreu um erro ao deletar o contato');
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())));
    });
  };

  const handletryAgain = () => {
    loadContacts();
  };

  return {
    isPending,
    contacts,
    filteredContacts,
    orderBy,
    search,
    isLoading,
    hasError,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    handleChangeOrder,
    handleCloseDeleteModal,
    handleDeleteContact,
    handleDeleteConfirmContact,
    handleSearch,
    handletryAgain,
  };
}
