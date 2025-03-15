import { useCallback, useState } from 'react';

export default function useFieldErrors() {
  const [errors, setErrors] = useState([]);

  function setError({
    field, message,
  }) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  const removeError = useCallback((fieldName) => {
    setErrors((prevState) => prevState.filter((item) => item.field !== fieldName));
  }, []);

  const getErrorMessageByFieldName = useCallback((fieldName) => (
    errors.find((error) => error.field === fieldName)?.message
  ), [errors]);

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
