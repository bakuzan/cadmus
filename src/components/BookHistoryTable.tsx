'use client';
import React, { useState } from 'react';

import { HistoryDetailedViewModel } from '@/types/History';
import { ImageDisplayMode } from '@/constants/imageDisplayMode';
import ImageWithFallback from '@/components/ImageWithFallback';
import BookBlock from '@/components/BookBlock';

import { formatDateForDisplay, getDateYear } from '@/utils/date';
import getDifferenceBetweenDates from '@/utils/getDateDifference';

import styles from './BookHistoryTable.module.css';
import DateBlock from './DateBlock';

interface BookHistoryTableProps {
  history: HistoryDetailedViewModel[];
  includeYearRows: boolean;
  imageDisplayMode: ImageDisplayMode;
}

export default function BookHistoryTable(props: BookHistoryTableProps) {
  const [collapsed, setCollapsed] = useState(new Map<number, boolean>([]));
  const { includeYearRows, imageDisplayMode } = props;
  const isNotImageDisplayNone = imageDisplayMode !== ImageDisplayMode.NONE;
  const isImageDisplayAlways = imageDisplayMode === ImageDisplayMode.ALL;

  function toggleYear(year: number) {
    setCollapsed((prev) => {
      const m = new Map(prev);
      m.set(year, !m.get(year));
      return m;
    });
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th className={styles.leftAlign}>Book</th>
          <th>Dates</th>
        </tr>
      </thead>
      <tbody>
        {props.history.map((x, i, arr) => {
          const prevItem = arr[i - 1];
          const prevYear = prevItem ? getDateYear(prevItem.startDate) : null;
          const year = getDateYear(x.startDate);
          const isNewYear = prevYear !== year;

          const showImage =
            isNotImageDisplayNone && (isImageDisplayAlways || !x.endDate);

          const isCollapsed = collapsed.get(year) ?? false;
          if (isCollapsed && !isNewYear) {
            return null;
          }

          return (
            <React.Fragment key={x.historyId}>
              {includeYearRows &&
                isNewYear &&
                (() => {
                  const bookCount = arr.reduce(
                    (p, c) =>
                      getDateYear(c.startDate) === year ? p + c.bookCount : p,
                    0
                  );
                  const s = bookCount === 1 ? '' : 's';
                  const label = `${bookCount} book${s} read`;

                  return (
                    <tr className={styles.yearRow}>
                      <th colSpan={3}>
                        <button
                          className={styles.yearHeader}
                          onClick={() => toggleYear(year)}
                        >
                          <span>{year}</span>
                          &nbsp;
                          <span
                            className={styles.muted}
                            aria-label={label}
                            title={label}
                          >
                            <span aria-hidden>({bookCount})</span>
                          </span>
                        </button>
                      </th>
                    </tr>
                  );
                })()}
              {!isCollapsed && (
                <tr>
                  <td className={styles.imageCell}>
                    {showImage && (
                      <ImageWithFallback
                        className={styles.image}
                        src={`/api/image/${x.isbn13}`}
                        alt={`Cover for ${x.title}`}
                        priority={false}
                        width={80}
                        height={123}
                      />
                    )}
                  </td>
                  <td data-column-title="Book">
                    <BookBlock book={x} />
                  </td>
                  <td data-column-title="Dates">
                    <DateBlock startDate={x.startDate} endDate={x.endDate} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
