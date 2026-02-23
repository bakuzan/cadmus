'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { HistoryDetailedViewModel } from '@/types/History';

import ImageWithFallback from '@/components/ImageWithFallback';

import { formatDateForDisplay, getDateYear } from '@/utils/date';
import getDifferenceBetweenDates from '@/utils/getDateDifference';

import styles from './BookHistoryTable.module.css';

interface BookHistoryTableProps {
  history: HistoryDetailedViewModel[];
}

export default function BookHistoryTable(props: BookHistoryTableProps) {
  const [collapsed, setCollapsed] = useState(new Map<number, boolean>([]));

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
          <th>Book</th>
          <th>Dates</th>
        </tr>
      </thead>
      <tbody>
        {props.history.map((x, i, arr) => {
          const prevItem = arr[i - 1];
          const prevYear = prevItem ? getDateYear(prevItem.startDate) : null;
          const year = getDateYear(x.startDate);
          const isNewYear = prevYear !== year;

          const diff = getDifferenceBetweenDates(x.startDate, x.endDate);
          const daysLabel = `${diff.details} ${diff.text}`;
          const isCollapsed = collapsed.get(year) ?? false;
          if (isCollapsed && !isNewYear) {
            return null;
          }

          return (
            <React.Fragment key={x.historyId}>
              {isNewYear &&
                (() => {
                  const bookCount = arr.reduce(
                    (p, c) =>
                      getDateYear(c.startDate) === year ? p + c.bookCount : p,
                    0
                  );
                  const s = bookCount === 1 ? '' : 's';
                  const label = `${bookCount} book${s} read`;

                  return (
                    <tr className="year-row">
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
                    {!x.endDate && (
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
                    <div className={styles.dataColumn}>
                      <Link href={`/books/${x.bookId}`}>{x.title}</Link>
                      <div className={styles.metadata}>
                        <div className="muted">{x.author}</div>
                        {x.seriesName && (
                          <div className="muted">({x.seriesName})</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td data-column-title="Dates">
                    <div className={styles.dates}>
                      <div>{formatDateForDisplay(x.startDate)}</div>
                      <div title={daysLabel}>
                        <span aria-hidden>&nbsp;–&nbsp;</span>
                      </div>
                      <div>
                        {x.endDate
                          ? formatDateForDisplay(x.endDate)
                          : 'Present'}
                      </div>
                    </div>
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
