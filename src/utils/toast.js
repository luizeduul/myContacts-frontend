import EventManager from '../lib/EventManager';

export const ToastEventManager = new EventManager();

export default function toast({ type, text }) {
  ToastEventManager.emit('addtoast', { type, text });
}

export function toastSuccess(text) {
  toast({ type: 'success', text });
}

export function toastError(text) {
  toast({ type: 'danger', text });
}

export function toastWarning(text) {
  toast({ type: 'warning', text });
}

export function toastInfo(text) {
  toast({ type: 'info', text });
}
