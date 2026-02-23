'use client';
import { BookInLibraryViewModel } from '@/types/Books';

import onUpdateBookSeries from '@/actions/onUpdateBookSeries';
import InLibraryIcon from '@/components/InLibraryIcon';
import useToast from '@/hooks/useToast';
import { SeriesViewModel } from '@/types/Series';

import styles from './BookInfoTable.module.css';

interface BookInfoTableProps {
  book: BookInLibraryViewModel;
  series: SeriesViewModel[];
}

export default function BookInfoTable({ book, series }: BookInfoTableProps) {
  const toast = useToast();
  const defaultSeriesValue = book.seriesId ?? undefined;

  return (
    <table className={styles.bookTable}>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <strong>ISBN-13</strong>
          </th>
          <td>{book.isbn13}</td>
        </tr>
        <tr>
          <th>
            <strong>ISBN-10</strong>
          </th>
          <td>{book.isbn10}</td>
        </tr>
        <tr>
          <th>
            <strong>Binding</strong>
          </th>
          <td>{book.binding}</td>
        </tr>
        <tr>
          <th>
            <strong>Publisher</strong>
          </th>
          <td>{book.publisher}</td>
        </tr>
        <tr>
          <th>
            <strong>Published</strong>
          </th>
          <td>{book.published}</td>
        </tr>
        <tr className={styles.noHover}>
          <th>
            <strong>Series</strong>
          </th>
          <td>
            <form
              className={styles.form}
              id="bookSeries"
              name="bookSeries"
              action={(data) =>
                onUpdateBookSeries(data)
                  .then(() => toast('info', 'Series updated.'))
                  .catch((error) => toast('error', error.message))
              }
            >
              <input type="hidden" name="bookId" value={book.id} />

              <label className={styles.label}>
                <select
                  key={defaultSeriesValue}
                  className={styles.select}
                  id="seriesId"
                  name="seriesId"
                  defaultValue={defaultSeriesValue}
                >
                  <option value="">None</option>
                  {series.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="primary">
                Save
              </button>
            </form>
          </td>
        </tr>
        <tr className={styles.noHover}>
          <th>
            <strong>In Library?</strong>
          </th>
          <td>
            <InLibraryIcon isIn={book.inLibrary} />
          </td>
        </tr>
        {book.bookCount > 1 && (
          <tr>
            <th>
              <strong>Counts As</strong>
            </th>
            <td>{book.bookCount} books</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
