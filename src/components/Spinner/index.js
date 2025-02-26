import React from 'react';
import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

function Spinner({ size }) {
  return <StyledSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 90,
};

export default Spinner;
