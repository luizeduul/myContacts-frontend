/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import React from 'react';

import PropTypes from 'prop-types';
import { Container } from './styles';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

function SearchNotFound({
  search,
}) {
  return (
        <Container>
            <div>
                <img src={magnifierQuestion} alt="Magnifier question" />
                <span>
                    Nenhum resultado foi encontrado para <strong>{search}</strong>.
                </span>
            </div>
        </Container>
  );
}

SearchNotFound.propTypes = {
  search: PropTypes.string.isRequired,
};

export default SearchNotFound;
