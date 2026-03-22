'use client';
import { useState } from 'react';

import onToggleRepeatShortlist from '@/actions/onToggleRepeatShortlist';
import useToast from '@/hooks/useToast';

import styles from './AddRepeatShortlist.module.css';

interface AddRepeatShortlistProps {
  bookId: number;
  bookInShortlist: boolean;
  hideIfInShortlist?: boolean;
  onSuccess?: () => void;
}

export default function AddRepeatShortlist(props: AddRepeatShortlistProps) {
  const [inShortlist, setInShortlist] = useState(props.bookInShortlist);
  const toast = useToast();

  if (props.hideIfInShortlist && inShortlist) {
    return null;
  }

  return (
    <form
      className={styles.form}
      id="addRepeatShortlist"
      name="addRepeatShortlist"
      action={(data) =>
        onToggleRepeatShortlist(data)
          .then(() => {
            setInShortlist((p) => !p);
            props.onSuccess?.();
          })
          .catch((error) => toast('error', error.message))
      }
    >
      <input type="hidden" name="bookId" value={props.bookId} />

      <div className={styles.buttonWrapper}>
        <button type="submit" className={inShortlist ? 'danger' : 'primary'}>
          {inShortlist ? 'Cancel Reread' : 'Reread'}
        </button>
      </div>
    </form>
  );
}
