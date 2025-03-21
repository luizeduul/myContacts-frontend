import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './styles';

function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts,
}) {
  let alignment;
  if (hasError) {
    alignment = 'flex-end';
  } else if (qtyOfContacts > 0) {
    alignment = 'space-between';
  } else {
    alignment = 'center';
  }

  return (
    <Container justifyContent={alignment}>
      {(!hasError && qtyOfContacts > 0) && (
        <strong>
          {qtyOfFilteredContacts}
          {' '}
          {qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <Link to="/novo">Novo contato</Link>
    </Container>

  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};

export default Header;
