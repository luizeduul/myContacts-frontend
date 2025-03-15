import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import useEditContact from './useEditContact';

function EditContact() {
  const {
    contactFormRef,
    handleSubmit,
    loading,
    contactName,
  } = useEditContact();

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

export default EditContact;
