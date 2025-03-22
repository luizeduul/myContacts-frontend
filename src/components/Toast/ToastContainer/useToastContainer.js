import {
  useEffect,
} from 'react';
import { ToastEventManager } from '../../../utils/toast';
import useAnimationList from '../../../hooks/useAnimationList';

export default function useToastContainer() {
  const {
    items: messages,
    setItems: setMessages,
    pendingRemovalItemsIds,
    handleRemoveItem: handleRemoveMessage,
    handleAnimationEnd,
  } = useAnimationList();

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [...prevState, { id: Math.random(), type, text }]);
    }

    ToastEventManager.on('addtoast', handleAddToast);

    return () => {
      ToastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  return {
    messages,
    handleRemoveMessage,
    pendingRemovalItemsIds,
    handleAnimationEnd,
  };
}
