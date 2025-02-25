/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from './styles';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { isEmailValid } from '../../utils/validators';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import CategoriesService from '../../services/CategoriesService';

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categpriesList, setCategoriesList] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await CategoriesService.listCategories();
        setCategoriesList(categories);
      } catch {} finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const isFormValid = name && !errors.length;

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

  function handleChangePhone(event) {
    setPhone(formatPhone(event.target.value));
    // if (event.target.value && !isEmailValid(event.target.value)) {
    //   setError({ field: 'email', message: 'Nome é obrigatório' });
    // } else {
    //   removeError('email');
    // }
  }

  return (
    <Form onSubmit={handleSubmit} method="post" noValidate>
      <FormGroup error={getErrorMessageByFieldName('nome')}>
        <Input
          placeholder="Nome *"
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
          onChange={handleChangePhone}
        />
      </FormGroup>

      <FormGroup isLoading={loadingCategories}>
        <Select
          onChange={(event) => setCategoryId(event.target.value)}
          value={categoryId}
          disabled={loadingCategories}
        >
          <option value="">Sem categoria</option>
          {categpriesList.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Button type="submit" disabled={!isFormValid}>
        {buttonLabel}
      </Button>
    </Form>
  );
}
ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ContactForm;
