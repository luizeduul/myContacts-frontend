import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

function Presentation({
  isLoading,
  contactName,
  contactFormRef,
  onSubmit,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={!isLoading ? `Editar ${contactName ?? ''}` : 'Carregando ...'} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={onSubmit}
      />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactName: PropTypes.string.isRequired,
  contactFormRef: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Presentation;
