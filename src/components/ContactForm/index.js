/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from './styles';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { isEmailValid } from '../../utils/validators';
import useErrors from '../../hooks/useErrors';

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleSubmit(event) {
    event.preventDefault();
    return null;
  }

  function handleChangeName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Nome é obrigatório' });
    } else {
      removeError('email');
    }
  }

  return (
    <Form onSubmit={handleSubmit} method="post" noValidate>
      <FormGroup error={getErrorMessageByFieldName('nome')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleChangeName}
          error={getErrorMessageByFieldName('nome')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleChangeEmail}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        >
          <option value="">Categoria</option>
          <option value="Instagram">Instagram</option>
          <option value="Whatsapp">Whatsapp</option>
          <option value="Facebook">Facebook</option>
        </Select>
      </FormGroup>

      <Button type="submit">
        {buttonLabel}
      </Button>
    </Form>
  );
}
ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ContactForm;
