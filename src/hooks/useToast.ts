import { useContext } from 'react';

import { ToastContext } from '@/context';

export default function useToast() {
  const toaster = useContext(ToastContext);
  return toaster.toast;
}
