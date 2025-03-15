/* eslint-disable arrow-body-style */
import {
  useCallback, useEffect, useMemo, useState,
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

  const loadContacts = useCallback(async () => {
    setIsLoading(true);

    try {
      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);

      setContacts(contactsList);
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

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase()));
  }, [contacts, search]);

  const handleChangeOrder = () => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteContact = (contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirmContact = async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      toastSuccess('Contato deletado com sucesso!');
      // eslint-disable-next-line max-len
      setContacts((prevState) => prevState.filter((contact) => contact.id !== contactBeingDeleted.id));
      handleCloseDeleteModal();
      setContactBeingDeleted(null);
    } catch (error) {
      toastError(error?.message || 'Ocorreu um erro ao deletar o contato');
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handletryAgain = () => {
    loadContacts();
  };

  return {
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
