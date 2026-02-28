'use client';
import { useState } from 'react';

import { BookHistoryForPeriod } from '@/types/Stats';

import monthNames from '@/constants/monthNames';
import StatsMonthCountsDetail from './StatsMonthCountDetail';
import useToast from '@/hooks/useToast';
import getLabelForPeriodString from '@/utils/getLabelForPeriodString';

import styles from '@/components/StatsMonthCountsTable.module.css';

interface StatsMonthCountsTable {
  years: number[];
  monthCounts: Map<string, number[]>;
  maxMonthCount: number;
}

const YEAR_DISPLAY_LIMIT = 5;

export default function StatsMonthCountsTable(props: StatsMonthCountsTable) {
  const [yearOffset, setYearOffset] = useState(0);
  const [detail, setDetail] = useState<BookHistoryForPeriod | null>(null);
  const toast = useToast();

  async function onCellClick(period: string, historyIds: number[]) {
    try {
      const res = await fetch('/api/stats-counts-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ period, historyIds })
      });

      if (!res.ok) {
        throw new Error(`Unable to fetch ${period} counts detail`);
      }

      const data = await res.json();
      setDetail(data);
    } catch (error: any) {
      toast('error', error.message);
    }
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
                  <button
                    type="button"
                    className={styles.headerButton}
                    onClick={() => {
                      const yearIds = Array.from(monthNames.keys()).reduce(
                        (p, month) => [
                          ...p,
                          ...(props.monthCounts.get(`${year}-${month}`) ?? [])
                        ],
                        [] as number[]
                      );

                      onCellClick(`${year}`, yearIds ?? []);
                    }}
                  >
                    {year}
                  </button>
                </th>
                {Array.from(monthNames.keys()).map((monthNumber) => {
                  const ratio =
                    (props.monthCounts.get(`${year}-${monthNumber}`)?.length ??
                      0) / props.maxMonthCount;

                  const label = `${monthNames.get(monthNumber)!.long} ${year}`;
                  const month = `${year}-${monthNumber}`;
                  const ids = props.monthCounts.get(month);
                  const count = ids?.length ?? 0;
                  const tooltipText = `${count} in ${label}`;

                  return (
                    <td key={monthNumber} data-tooltip={tooltipText}>
                      <button
                        type="button"
                        className={styles.cellButton}
                        disabled={count === 0}
                        onClick={() => onCellClick(month, ids ?? [])}
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
      {detail && (
        <StatsMonthCountsDetail
          label={getLabelForPeriodString(detail.period)}
          history={detail.history}
        />
      )}
    </div>
  );
}
