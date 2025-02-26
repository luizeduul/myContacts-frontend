import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

function NewContact() {
  async function handleSubmit(values) {
    const contact = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      category_id: values.categoryId,
    };
    const response = await ContactsService.createContact(contact);
    console.log(response);
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
