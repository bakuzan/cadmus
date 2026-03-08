'use client';
import React, { useState } from 'react';

import { GroupedBookHistory } from '@/types/Stats';

import InLibraryIcon from '@/components/InLibraryIcon';
import BookBlock from '@/components/BookBlock';
import SearchBox from '@/components/SearchBox';
import DateBlock from '@/components/DateBlock';
import { makeSorter, Sort } from '@/utils/compareValues';

import styles from './StatsRepeatsTable.module.css';
import { filterBooks } from '@/utils/filterBooks';

interface StatsRepeatsTableProps {
  repeats: GroupedBookHistory[];
}

interface HeaderSortButtonProps {
  label: string;
  sortKey: keyof GroupedBookHistory;
  sort: Sort<GroupedBookHistory>;
  onClick: (sort: Sort<GroupedBookHistory>) => void;
}

function HeaderSortButton(props: HeaderSortButtonProps) {
  const isCurrentSortChoice = props.sortKey === props.sort.key;
  const isAsc = props.sort.direction === 'asc';

  return (
    <button
      className={styles.repeatsButtonHeader}
      type="button"
      onClick={() =>
        props.onClick({
          key: props.sortKey,
          direction: isCurrentSortChoice
            ? isAsc
              ? 'desc'
              : 'asc'
            : props.sort.direction
        })
      }
    >
      {props.label}
      <div className={styles.sortIcon}>
        {isCurrentSortChoice ? (isAsc ? '▲' : '▼') : ''}
      </div>
    </button>
  );
}

export default function StatsRepeatsTable(props: StatsRepeatsTableProps) {
  const [expanded, setExpanded] = useState(new Map<number, boolean>());
  const [sort, setSort] = useState<Sort<GroupedBookHistory>>({
    key: 'latestRepeatDate',
    direction: 'desc'
  });
  const [searchString, setSearchString] = useState('');
  const repeats = props.repeats
    .filter(filterBooks(searchString))
    .sort(makeSorter(sort));

  function toggleRow(bookId: number) {
    setExpanded((prev) => {
      const m = new Map(prev);
      m.set(bookId, !m.get(bookId));
      return m;
    });
  }

  return (
    <>
      <SearchBox
        key="search"
        value={searchString}
        onChange={(v) => setSearchString(v)}
      />
      <table key="table" className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th className={styles.title}>
              <HeaderSortButton
                label="Book"
                sortKey="title"
                sort={sort}
                onClick={setSort}
              />
            </th>
            <th className={styles.numberStat}>
              <HeaderSortButton
                label="Repeats"
                sortKey="repeatsCount"
                sort={sort}
                onClick={setSort}
              />
            </th>
            <th className={styles.numberStat}>
              <HeaderSortButton
                label="Latest Repeat Date"
                sortKey="latestRepeatDate"
                sort={sort}
                onClick={setSort}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {repeats.map((x) => {
            const isExpanded = expanded.get(x.bookId) ?? false;

            return (
              <React.Fragment key={x.bookId}>
                <tr
                  key={`${x.bookId}-core`}
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
                      {x.repeatsCount}
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
                        {x.entries.map((e) => (
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
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
