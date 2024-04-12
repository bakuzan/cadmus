'use client';
import { useRef } from 'react';
import onAddSeries from '@/actions/onAddSeries';
import useToast from '@/hooks/useToast';
import concat from '@/utils/concat';

import styles from './AddSeries.module.css';

export default function AddSeries() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const toast = useToast();

  return (
    <form
      ref={formRef}
      className={concat(styles.form, styles.formShrink)}
      id="addSeries"
      name="addSeries"
      action={(data) =>
        onAddSeries(data)
          .then(() => formRef.current?.reset())
          .catch((error) => toast('error', error.message))
      }
    >
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Enter a series name (must be unique)"
          required
        />
      </label>

      <button type="submit" className="primary">
        Add series
      </button>
    </form>
  );
}
