'use client';
import { useId } from 'react';
import Link from 'next/link';

import onUpdateSeries from '@/actions/onUpdateSeries';
import useToast from '@/hooks/useToast';

import { SeriesViewModel } from '@/types/Series';

import styles from './AddSeries.module.css';

interface UpdateSeriesProps {
  data: SeriesViewModel;
  showLink?: boolean;
}

export default function UpdateSeries(props: UpdateSeriesProps) {
  const componentId = useId();
  const toast = useToast();

  const showLink = props.showLink ?? false;

  return (
    <form
      className={styles.form}
      id={`updateSeries_${componentId}`}
      name="updateSeries"
      action={(data) =>
        onUpdateSeries(data)
          .then(({ message }) => toast('info', message))
          .catch((error) => toast('error', error.message))
      }
    >
      {showLink && (
        <Link
          className={styles.link}
          href={`/series/${props.data.id}`}
          title="Go to series page"
        >
          🔗
        </Link>
      )}

      <input type="hidden" name="id" value={props.data.id} />

      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          name="name"
          defaultValue={props.data.name}
          required
        />
      </label>

      <div className="flex-spacer"></div>

      <button type="submit" className="primary">
        Update series
      </button>
    </form>
  );
}
