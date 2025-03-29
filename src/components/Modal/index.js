import React from 'react';
import PropTypes from 'prop-types';
import { Container, Footer, Overlay } from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

function Modal({
  title = '',
  visible,
  children,
  onCancel,
  onConfirm,
  loading = false,
  danger = false,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>
          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={loading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
