import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function InputSearch({
  value,
  onChange,
}) {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Pesquise pelo nome"
        onChange={onChange}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputSearch;
