'use client';
import { useEffect, useReducer } from 'react';

import { ToastContext } from '@/context';
import concat from '@/utils/concat';

import { Toast, ToastType } from '@/types/Toast';

import styles from './Toaster.module.css';

type ToasterState = {
  toast: Toast[];
};

type ToastAction =
  | { type: 'pop' }
  | { type: 'insert'; messageType: ToastType; message: string };

function reducer(state: ToasterState, action: ToastAction) {
  switch (action.type) {
    case 'insert':
      return {
        ...state,
        toast: [{ messageType: action.messageType, message: action.message }]
      };
    case 'pop':
      return { ...state, toast: [] };
    default:
      return { ...state };
  }
}

export default function Toaster({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ toast }, dispatch] = useReducer(reducer, {
    toast: []
  });

  const hasToast = toast.length > 0;

  useEffect(() => {
    if (hasToast) {
      setTimeout(() => dispatch({ type: 'pop' }), 5000);
    }
  }, [hasToast]);

  return (
    <>
      <div className={styles.toaster}>
        {toast.map((t) => {
          const isError = t.messageType === 'error';

          return (
            <div
              key={t.message}
              className={concat(styles.toast, styles[t.messageType])}
            >
              <div className={styles.icon}>{isError ? '⚠' : '🛈'}</div>
              <div>{t.message}</div>
            </div>
          );
        })}
      </div>
      <ToastContext.Provider
        value={{
          toast: (messageType: ToastType, message: string) =>
            dispatch({ type: 'insert', messageType, message })
        }}
      >
        {children}
      </ToastContext.Provider>
    </>
  );
}
