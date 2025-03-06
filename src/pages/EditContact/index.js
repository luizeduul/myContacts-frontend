import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldValues(contact);

        setLoading(false);
      } catch (error) {
        history.push('/');
        toastError(error?.message || 'Ocorreu um erro ao carregar o contato');
      }
    }
    loadContact();
  }, [history, id]);

  async function handleSubmit(values) {
    try {
      const contact = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        category_id: values.categoryId,
      };
      await ContactsService.createContact(contact);

      toastSuccess('Contato editado com sucesso.');
    } catch (error) {
      toastError('Ocorreu um erro ao editar o contato');
    }
  }
  return (
    <>
      <Loader isLoading={loading} />
      <PageHeader title="Editar" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
                // eslint-disable-next-line react/jsx-no-bind
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
