export default function toast({ type, text }) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  });

  document.dispatchEvent(event);
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
