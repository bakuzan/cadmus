'use client';
import { useRef } from 'react';

import onAddHistory from '@/actions/onAddHistory';
import concat from '@/utils/concat';
import { getTodayYYYYMMDD } from '@/utils/date';

import styles from './AddHistory.module.css';

interface AddHistoryProps {
  bookId: number;
}

export default function AddHistory(props: AddHistoryProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const today = getTodayYYYYMMDD();

  return (
    <form
      ref={formRef}
      className={concat(styles.form, styles.formShrink)}
      id="addHistory"
      name="addHistory"
      action={(data) => onAddHistory(data).then(() => formRef.current?.reset())}
    >
      <input type="hidden" name="bookId" value={props.bookId} />

      <label className={styles.label}>
        Start Date
        <input
          className={styles.input}
          type="date"
          name="startDate"
          defaultValue={today}
          required
        />
      </label>

      <button type="submit" className="primary">
        Add history
      </button>
    </form>
  );
}
