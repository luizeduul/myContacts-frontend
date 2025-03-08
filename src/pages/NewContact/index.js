import React, { useCallback, useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import { toastError, toastSuccess } from '../../utils/toast';

function NewContact() {
  const contactForm = useRef(null);
  const handleSubmit = useCallback(async (values) => {
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
  }, []);

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
