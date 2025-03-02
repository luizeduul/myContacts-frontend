import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './styles';
import Spinner from '../Spinner';

function Button({
  type, isLoading, disabled,
  children,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      isLoading={isLoading}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.defaultProps = {
  type: 'button',
  isLoading: false,
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
