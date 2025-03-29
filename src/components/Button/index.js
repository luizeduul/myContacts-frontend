import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './styles';
import Spinner from '../Spinner';

function Button({
  type = 'button',
  isLoading = false,
  disabled = false,
  danger = false,
  children,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      isLoading={isLoading}
      danger={danger}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
