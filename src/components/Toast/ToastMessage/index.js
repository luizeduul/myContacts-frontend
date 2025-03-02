import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { Container } from './styles';
import xCircleIcons from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcons from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({
  message,
  onRemoveMessage,
}) {
  const {
    type, id, text, duration,
  } = message;
  const handleRemoveToast = useCallback(() => {
    onRemoveMessage(id);
  }, [onRemoveMessage, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemoveToast();
    }, duration || 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, handleRemoveToast]);

  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {type === 'danger' && <img src={xCircleIcons} alt="X" />}
      {type === 'success' && <img src={checkCircleIcons} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success', 'info']),
    id: PropTypes.number.isRequired,
    duration: PropTypes.number,
  }).isRequired,
};
