import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import { toastError, toastSuccess } from '../../utils/toast';

function NewContact() {
  async function handleSubmit(values) {
    try {
      const contact = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        category_id: values.categoryId,
      };
      await ContactsService.createContact(contact);

      toastSuccess('Contato cadastrado com sucesso.');
    } catch (error) {
      toastError('Ocorreu um erro ao cadastrar o contato');
    }
  }
  return (
    <>
      <PageHeader title="Cadastrar novo" />
      <ContactForm
        buttonLabel="Cadastrar"
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
