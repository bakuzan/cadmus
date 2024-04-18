import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getFullHistory } from '@/database/history';

import styles from './page.module.css';
import { formatDateForDisplay, getDateYear } from '@/utils/date';

export default async function Home() {
  const history = await getFullHistory();

  return (
    <>
      <h1>Complete Read History</h1>
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

            return (
              <React.Fragment key={x.historyId}>
                {isNewYear && (
                  <tr>
                    <th colSpan={3}>
                      <div className={styles.yearHeader}>{year}</div>
                    </th>
                  </tr>
                )}
                <tr>
                  <td className={styles.imageCell}>
                    {!x.endDate && (
                      <Image
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
                      <div>&nbsp;–&nbsp;</div>
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
