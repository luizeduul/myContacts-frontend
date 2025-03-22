import React from 'react';

import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import useToastContainer from './useToastContainer';

function ToastContainer() {
  const {
    handleRemoveMessage, handleAnimationEnd,
    renderList,
  } = useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          isLeaving={isLeaving}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
