/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from './styles';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/validators';

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [erros, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    return null;
  }

  function handleChangeName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((item) => item.field !== 'name'));
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    if (isEmailValid(event.target.value)) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((item) => item.field !== 'name'));
    }
  }
  return (
    <Form onSubmit={handleSubmit} method="post">
      <FormGroup>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleChangeName}
        />
      </FormGroup>

      <FormGroup
        error="O formato do e-mail é inválido"
      >
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleChangeEmail}
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
