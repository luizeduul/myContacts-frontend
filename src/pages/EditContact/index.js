import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

function NewContact() {
  return (
    <>
      <PageHeader title="Editar" />
      <ContactForm buttonLabel="Salvar alterações" />
    </>
  );
}

export default NewContact;
