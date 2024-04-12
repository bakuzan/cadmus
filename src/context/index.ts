import { createContext } from 'react';

import { ToastType } from '@/types/Toast';

export const ToastContext = createContext({
  toast: (messageType: ToastType, message: string) => {}
});
