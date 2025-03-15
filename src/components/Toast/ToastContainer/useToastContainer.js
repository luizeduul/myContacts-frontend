import { useCallback, useEffect, useState } from 'react';
import { ToastEventManager } from '../../../utils/toast';

export default function useToastContainer() {
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

  return {
    messages,
    handleRemoveMessage,
  };
}
