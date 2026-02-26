'use client';
import monthNames from '@/constants/monthNames';

import styles from '@/components/StatsMonthCountsTable.module.css';
import { useState } from 'react';

interface StatsMonthCountsTable {
  years: number[];
  monthCounts: Map<string, number[]>;
  maxMonthCount: number;
}

const YEAR_DISPLAY_LIMIT = 5;

export default function StatsMonthCountsTable(props: StatsMonthCountsTable) {
  const [yearOffset, setYearOffset] = useState(0);

  function onCellClick(label: string, bookIds: number[]) {
    console.log('TODO >> ', label, bookIds);
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <div className={styles.headerControls}>
                <button
                  className={styles.headerButton}
                  title="Move the view forwards years"
                  disabled={yearOffset === 0}
                  onClick={() => setYearOffset((p) => p - 1)}
                >
                  ▲
                </button>
                <button
                  className={styles.headerButton}
                  title="Move the view backwards years"
                  disabled={
                    yearOffset === props.years.length - YEAR_DISPLAY_LIMIT
                  }
                  onClick={() => setYearOffset((p) => p + 1)}
                >
                  ▼
                </button>
              </div>
            </th>
            {Array.from(monthNames.values()).map((x) => (
              <th key={x.short}>{x.short}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.years
            .slice(yearOffset, yearOffset + YEAR_DISPLAY_LIMIT)
            .map((year) => (
              <tr key={year}>
                <th>
                  <button type="button" className={styles.headerButton}>
                    {year}
                  </button>
                </th>
                {Array.from(monthNames.keys()).map((monthNumber) => {
                  const ratio =
                    (props.monthCounts.get(`${year}-${monthNumber}`)?.length ??
                      0) / props.maxMonthCount;

                  const label = `${monthNames.get(monthNumber)!.long} ${year}`;
                  const ids = props.monthCounts.get(`${year}-${monthNumber}`);
                  const count = ids?.length ?? 0;
                  const tooltipText = `${count} in ${label}`;

                  return (
                    <td key={monthNumber} data-tooltip={tooltipText}>
                      <button
                        type="button"
                        className={styles.cellButton}
                        disabled={count === 0}
                        onClick={() => onCellClick(label, ids ?? [])}
                      >
                        <div style={{ opacity: ratio }}></div>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <section className={styles.detailSection}>
        <header>
          <h3>Label</h3>
        </header>
        <div className={styles.container}>Table Here</div>
      </section>
    </div>
  );
}
