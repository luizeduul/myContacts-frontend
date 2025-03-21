import React from 'react';

import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import useToastContainer from './useToastContainer';

function ToastContainer() {
  const { messages, handleRemoveMessage } = useToastContainer();
  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
