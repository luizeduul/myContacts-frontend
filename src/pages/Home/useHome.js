 import {
  useCallback, useEffect, useState, useMemo,
  useDeferredValue
} from 'react';
import ContactsService from '../../services/ContactsService';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import { toastError, toastSuccess } from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useSafeAsyncState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useSafeAsyncState(false);
  const [hasError, setHasError] = useSafeAsyncState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useSafeAsyncState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useSafeAsyncState(false);

  const [search, setSearch] = useState('');
  const [deferredSearch, setDerredSearch] = useState('');


  const deferredSerch = useDeferredValue(search);

  const loadContacts = useCallback(async (signal) => {
    setIsLoading(true);

    try {
      const contactsList = await ContactsService.listContacts(orderBy, signal);

      setHasError(false);

      setContacts(contactsList);
    } catch (error) {
      if(error instanceof DOMException && error.name === 'AbortError'){
        return;
      }
      setContacts([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, setContacts, setHasError, setIsLoading]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);
    return () => {
      controller.abort();
      setContacts([]);
    };
  }, [loadContacts, setContacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) => contact.name.toLowerCase().includes(deferredSearch.toLowerCase()),
    );
  }, [contacts, deferredSearch]);

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
