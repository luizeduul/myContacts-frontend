/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import React, {
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer, Form } from './styles';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { useContactForm } from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    name,
    email,
    phone,
    categoryId,
    setCategoryId,
    categpriesList,
    loadingCategories,
    submitting,
    isFormValid,
    handleSubmit,
    handleChangeName,
    handleChangeEmail,
    handleChangePhone,
    getErrorMessageByFieldName,
  } = useContactForm({ onSubmit, ref });

  return (
    <Form onSubmit={handleSubmit} method="post" noValidate>
      <FormGroup error={getErrorMessageByFieldName('nome')}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleChangeName}
          error={getErrorMessageByFieldName('nome')}
          disabled={submitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleChangeEmail}
          error={getErrorMessageByFieldName('email')}
          disabled={submitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handleChangePhone}
          disabled={submitting}
        />
      </FormGroup>

      <FormGroup isLoading={loadingCategories}>
        <Select
          onChange={(event) => setCategoryId(event.target.value)}
          value={categoryId}
          disabled={loadingCategories || submitting}
        >
          <option value="">Sem categoria</option>
          {categpriesList.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={submitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});
ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
