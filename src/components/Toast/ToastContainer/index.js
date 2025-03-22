import React from 'react';

import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import useToastContainer from './useToastContainer';

function ToastContainer() {
  const {
    messages, pendingRemovalItemsIds = [], handleRemoveMessage, handleAnimationEnd,
  } = useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          isLeaving={pendingRemovalItemsIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
