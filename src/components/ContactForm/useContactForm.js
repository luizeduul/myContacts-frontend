import { useEffect, useImperativeHandle, useState } from 'react';
import formatPhone from '../../utils/formatPhone';
import { isEmailValid } from '../../utils/validators';
import useFieldErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export function useContactForm({
  onSubmit,
  ref,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categpriesList, setCategoriesList] = useSafeAsyncState([]);
  const [loadingCategories, setLoadingCategories] = useSafeAsyncState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useFieldErrors();

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const categories = await CategoriesService.listCategories('asc', controller.signal);
        setCategoriesList(categories);
      } catch { } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategoriesList, setLoadingCategories]);

  const isFormValid = name && !errors.length;

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setSubmitting(false);
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

  useImperativeHandle(ref, () => ({
    setFieldValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },

    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  function handleChangePhone(event) {
    setPhone(formatPhone(event.target.value));
    // if (event.target.value && !isEmailValid(event.target.value)) {
    //   setError({ field: 'email', message: 'Nome é obrigatório' });
    // } else {
    //   removeError('email');
    // }
  }

  return {
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
  };
}
