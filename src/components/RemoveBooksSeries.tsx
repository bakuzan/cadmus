'use client';
import { useId } from 'react';

import onUpdateBookSeries from '@/actions/onUpdateBookSeries';
import useToast from '@/hooks/useToast';

interface RemoveBooksSeriesProps {
  bookId: number;
}

export default function RemoveBooksSeries(props: RemoveBooksSeriesProps) {
  const componentId = useId();
  const toast = useToast();

  return (
    <form
      id={`bookSeries_${componentId}`}
      name="bookSeries"
      action={(data) =>
        onUpdateBookSeries(data)
          .then(() => toast('info', 'Book removed from series.'))
          .catch((error) => toast('error', error.message))
      }
    >
      <input type="hidden" name="bookId" value={props.bookId} />
      <input type="hidden" name="seriesId" value="" />

      <button type="submit" className="primary">
        Remove
      </button>
    </form>
  );
}
