import {
  useCallback, useEffect, useRef,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import { toastError, toastSuccess } from '../../utils/toast';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const params = useParams();

  const { id } = params;

  const navigate = useNavigate();

  const contactFormRef = useRef(null);

  const [loading, setLoading] = useSafeAsyncState(true);
  const [contactName, setContactName] = useSafeAsyncState('');

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldValues(contact);

          setContactName(contact?.name);

          setLoading(false);
        });
      } catch (error) {
        if(error instanceof DOMException && error.name === 'AbortError'){
          return;
        }

        safeAsyncAction(() => {
          navigate('/', { replace: true });
          toastError(error?.message || 'Ocorreu um erro ao carregar o contato');
        });
      }
    }
    loadContact();

    return () => {
      controller.abort();
    };
  }, [
    navigate,
    id,
    setContactName,
    setLoading,
    safeAsyncAction,
  ]);

  const handleSubmit = useCallback(async (contact) => {
    try {
      const response = await ContactsService.updateContact(id, contact);

      setContactName(response?.name);

      toastSuccess('Contato editado com sucesso.');
    } catch (error) {
      toastError('Ocorreu um erro ao editar o contato');
    }
  }, [id, setContactName]);

  return {
    loading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
