import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import { toastError, toastSuccess } from '../../utils/toast';

function NewContact() {
  const params = useParams();

  const { id } = params;

  const history = useHistory();

  const contactFormRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldValues(contact);

        setContactName(contact?.name);

        setLoading(false);
      } catch (error) {
        history.push('/');
        toastError(error?.message || 'Ocorreu um erro ao carregar o contato');
      }
    }
    loadContact();
  }, [history, id]);

  const handleSubmit = useCallback(async (values) => {
    try {
      const contact = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        category_id: values.categoryId,
      };
      const response = await ContactsService.updateContact(id, contact);

      setContactName(response?.name);

      toastSuccess('Contato editado com sucesso.');
    } catch (error) {
      toastError('Ocorreu um erro ao editar o contato');
    }
  }, [id]);

  return (
    <>
      <Loader isLoading={loading} />
      <PageHeader title={!loading ? `Editar ${contactName ?? ''}` : 'Carregando ...'} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
