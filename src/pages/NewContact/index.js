import React from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

// import { Container } from './styles';

function NewContact() {
  return (
    <>
      <PageHeader title="Cadastrar novo" />
      <Input
        placeholder="Nome"
        name="nome"
      />
      <Select
        aria-placeholder="Nome"
      />

      <Button type="button">
        Salvar alterações
      </Button>

      <Button type="button" disabled>
        Salvar alterações
      </Button>
    </>
  );
}

export default NewContact;
