import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import Spinner from '../Spinner';

export function FormGroup({ children, error =null, isLoading = false }) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading ? (
          <div className="loader">
            <Spinner size={16} />
          </div>
        ) : null}
      </div>
      {error ? <small>{error}</small> : null}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};
