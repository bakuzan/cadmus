import React from 'react';
import Link from 'next/link';

import ImageWithFallback from '@/components/ImageWithFallback';

import { getFullHistory } from '@/database/history';
import { formatDateForDisplay, getDateYear } from '@/utils/date';
import getDifferenceBetweenDates from '@/utils/getDateDifference';

import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const history = await getFullHistory();

  return (
    <>
      <h1>Book Read History</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Book</th>
            <th>Dates</th>
          </tr>
        </thead>
        <tbody>
          {history.map((x, i, arr) => {
            const prevItem = arr[i - 1];
            const prevYear = prevItem ? getDateYear(prevItem.startDate) : null;
            const year = getDateYear(x.startDate);
            const isNewYear = prevYear !== year;

            const diff = getDifferenceBetweenDates(x.startDate, x.endDate);
            const daysLabel = `${diff.details} ${diff.text}`;

            return (
              <React.Fragment key={x.historyId}>
                {isNewYear &&
                  (() => {
                    const bookCount = arr.filter(
                      (h) => getDateYear(h.startDate) === year
                    ).length;
                    const s = bookCount === 1 ? '' : 's';
                    const label = `${bookCount} book${s} read`;

                    return (
                      <tr>
                        <th colSpan={3}>
                          <div className={styles.yearHeader}>
                            <span>{year}</span>
                            &nbsp;
                            <span
                              className={styles.muted}
                              aria-label={label}
                              title={label}
                            >
                              <span aria-hidden>({bookCount})</span>
                            </span>
                          </div>
                        </th>
                      </tr>
                    );
                  })()}
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
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
