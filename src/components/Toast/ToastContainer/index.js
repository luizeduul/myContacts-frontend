import React from 'react';

import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import useToastContainer from './useToastContainer';

function ToastContainer() {
  const {
    handleRemoveMessage,
    renderList,
  } = useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          isLeaving={isLeaving}
          animetedRef={animatedRef}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
