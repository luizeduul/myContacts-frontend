import { useCallback, useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import { toastError, toastSuccess } from '../../utils/toast';

export default function useNewContact() {
  const contactForm = useRef(null);
  const handleSubmit = useCallback(async (contact) => {
    try {
      await ContactsService.createContact(contact);

      toastSuccess('Contato cadastrado com sucesso.');
    } catch (error) {
      toastError('Ocorreu um erro ao cadastrar o contato');
    }
  }, []);

  return {
    contactForm,
    handleSubmit,
  };
}
