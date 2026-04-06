'use client';
import React, { useState } from 'react';

import { HistoryDetailedViewModel } from '@/types/History';
import { PerYearStats } from '@/types/Stats';

import { ImageDisplayMode } from '@/constants/imageDisplayMode';
import ImageWithFallback from '@/components/ImageWithFallback';
import BookBlock from '@/components/BookBlock';
import DateBlock from '@/components/DateBlock';
import AddRepeatShortlist from '@/components/AddRepeatShortlist';

import { getDateYear } from '@/utils/date';

import styles from './BookHistoryTable.module.css';

interface BookHistoryTableProps {
  history: HistoryDetailedViewModel[];
  yearStats?: Record<string, PerYearStats>;
  imageDisplayMode: ImageDisplayMode;
}

export default function BookHistoryTable(props: BookHistoryTableProps) {
  const [collapsed, setCollapsed] = useState(new Map<number, boolean>([]));
  const { yearStats, imageDisplayMode } = props;
  const includeYearRows = yearStats !== undefined;
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
          <th></th>
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
                  const perYearStats = yearStats[year];
                  const bookCount = perYearStats.total;
                  const s = bookCount === 1 ? '' : 's';
                  const label = `${bookCount} book${s} read`;

                  return (
                    <tr className={styles.yearRow}>
                      <th colSpan={4}>
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
                  <td className={styles.onlyShowOnHover}>
                    {x.endDate && (
                      <AddRepeatShortlist
                        bookId={x.bookId}
                        bookInShortlist={x.inRepeatShortlist}
                        hideIfInShortlist={true}
                      />
                    )}
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
