import EventManager from '../lib/EventManager';

export const ToastEventManager = new EventManager();

export default function toast({ type, text, duration }) {
  ToastEventManager.emit('addtoast', { type, text, duration });
}

export function toastSuccess(text, duration) {
  toast({ type: 'success', text, duration });
}

export function toastError(text, duration) {
  toast({ type: 'danger', text, duration });
}

export function toastWarning(text, duration) {
  toast({ type: 'warning', text, duration });
}

export function toastInfo(text, duration) {
  toast({ type: 'info', text, duration });
}
