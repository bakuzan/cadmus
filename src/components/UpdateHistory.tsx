'use client';
import { useId } from 'react';

import onUpdateHistory from '@/actions/onUpdateHistory';
import useToast from '@/hooks/useToast';

import { HistoryViewModel } from '@/types/History';

import styles from './AddHistory.module.css';

interface UpdateHistoryProps {
  data: HistoryViewModel;
}

export default function UpdateHistory(props: UpdateHistoryProps) {
  const componentId = useId();
  const toast = useToast();

  return (
    <form
      className={styles.form}
      id={`updateHistory_${componentId}`}
      name="updateHistory"
      action={(data) =>
        onUpdateHistory(data)
          .then(({ message }) => toast('info', message))
          .catch((error) => toast('error', error.message))
      }
    >
      <input type="hidden" name="id" value={props.data.id} />
      <input type="hidden" name="bookId" value={props.data.bookId} />

      <label className={styles.label}>
        Start Date
        <input
          className={styles.input}
          type="date"
          name="startDate"
          defaultValue={props.data.startDate}
          required
        />
      </label>

      <label className={styles.label}>
        End Date
        <input
          className={styles.input}
          type="date"
          name="endDate"
          defaultValue={props.data.endDate ?? undefined}
        />
      </label>

      <div className="flex-spacer"></div>

      <button type="submit" className="primary">
        Update history
      </button>
    </form>
  );
}
