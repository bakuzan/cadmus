'use client';
import React, { useState } from 'react';

import { GroupedBookHistory } from '@/types/Stats';

import InLibraryIcon from '@/components/InLibraryIcon';
import BookBlock from '@/components/BookBlock';
import SearchBox from '@/components/SearchBox';
import DateBlock from '@/components/DateBlock';

import styles from './StatsRepeatsTable.module.css';

interface StatsRepeatsTableProps {
  repeats: GroupedBookHistory[];
}

function filterBooks(searchString: string) {
  const terms = searchString.toLowerCase().trim().split(' ');

  return function (value: GroupedBookHistory) {
    return terms.every(
      (t) =>
        value.title.toLowerCase().includes(t) ||
        value.author.toLowerCase().includes(t) ||
        value.seriesName?.toLowerCase().includes(t)
    );
  };
}

export default function StatsRepeatsTable(props: StatsRepeatsTableProps) {
  const [expanded, setExpanded] = useState(new Map<number, boolean>());
  const [searchString, setSearchString] = useState('');
  const repeats = props.repeats.filter(filterBooks(searchString));

  function toggleRow(bookId: number) {
    setExpanded((prev) => {
      const m = new Map(prev);
      m.set(bookId, !m.get(bookId));
      return m;
    });
  }

  return (
    <>
      <SearchBox value={searchString} onChange={(v) => setSearchString(v)} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th className={styles.title}>Book</th>
            <th className={styles.numberStat}>Repeats</th>
            <th className={styles.numberStat}>Latest Repeat Date</th>
          </tr>
        </thead>
        <tbody>
          {repeats.map((x) => {
            const isExpanded = expanded.get(x.bookId) ?? false;

            return (
              <>
                <tr
                  key={x.bookId}
                  className={isExpanded ? styles.expandedRow : ''}
                >
                  <td>
                    <InLibraryIcon isIn={x.isInLibrary} />
                  </td>
                  <td className={styles.title} data-column-title="Book">
                    <BookBlock book={x} />
                  </td>
                  <td className={styles.numberStat} data-column-title="Repeats">
                    <button
                      className={styles.repeatsButton}
                      type="button"
                      onClick={() => toggleRow(x.bookId)}
                    >
                      {x.entries.length - 1}
                    </button>
                  </td>
                  <td
                    className={styles.numberStat}
                    data-column-title="Latest Repeat Date"
                  >
                    {x.latestRepeatDate}
                  </td>
                </tr>
                {isExpanded && (
                  <tr key={`${x.bookId}-repeats`}>
                    <td colSpan={2}></td>
                    <td colSpan={2} data-column-title="Repeat History">
                      <div className={styles.dateBlocks}>
                        {x.entries.map((e, i) => (
                          <DateBlock
                            key={e.start}
                            startDate={e.start}
                            endDate={e.end}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
