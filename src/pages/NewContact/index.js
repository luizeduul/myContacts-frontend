import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import useNewContact from './useNewContact';

function NewContact() {
  const { contactForm, handleSubmit } = useNewContact();

  return (
    <>
      <PageHeader title="Cadastrar novo" />
      <ContactForm
        buttonLabel="Cadastrar"
        ref={contactForm}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
