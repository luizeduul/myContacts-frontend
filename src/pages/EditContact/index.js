import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import { toastError } from '../../utils/toast';

function NewContact() {
  const params = useParams();

  const { id } = params;

  const history = useHistory();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContact() {
      try {
        await ContactsService.getContactById(id);

        setLoading(false);
      } catch (error) {
        history.push('/');
        toastError(error?.message || 'Ocorreu um erro ao carregar o contato');
      }
    }
    loadContact();
  }, [history, id]);

  async function handleSubmit() {
    //

    return null;
  }
  return (
    <>
      <Loader isLoading={loading} />
      <PageHeader title="Editar" />
      <ContactForm
        buttonLabel="Salvar alterações"
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={handleSubmit}
        l
      />
    </>
  );
}

export default NewContact;
