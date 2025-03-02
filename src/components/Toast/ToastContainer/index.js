import React, { useState, useEffect, useCallback } from 'react';

import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { ToastEventManager } from '../../../utils/toast';

function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [...prevState, { id: Math.random(), type, text }]);
    }

    ToastEventManager.on('addtoast', handleAddToast);

    return () => {
      ToastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

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
