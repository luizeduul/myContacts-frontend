import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './styles';
import Spinner from '../Spinner';

function Button({
  type, isLoading, disabled,
  danger,
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

Button.defaultProps = {
  type: 'button',
  isLoading: false,
  disabled: false,
  danger: false,
  onClick: undefined,
};

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
