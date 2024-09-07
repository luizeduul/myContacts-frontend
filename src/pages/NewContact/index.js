import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

function NewContact() {
  return (
    <>
      <PageHeader title="Cadastrar novo" />
      <ContactForm buttonLabel="Cadastrar" />
    </>
  );
}

export default NewContact;
