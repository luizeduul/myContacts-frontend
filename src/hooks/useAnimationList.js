import { useCallback, useState } from 'react';

export default function useAnimationList(initialValue = []) {
  const [items, setItems] = useState(initialValue);

  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemsIds((prevState) => prevState.filter((itemId) => itemId !== id));
  }, []);

  return {
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
    items,
    setItems,
  };
}
