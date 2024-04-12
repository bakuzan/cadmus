export type ToastType = 'info' | 'error';

export interface Toast {
  messageType: ToastType;
  message: string;
}
