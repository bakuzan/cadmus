'use client';

import { PerYearStats } from '@/types/Stats';
import styles from './StatsNumbersTable.module.css';

interface NumbersTableColumn {
  header: string;
  key: keyof PerYearStats;
}

interface StatsNumbersTableProps {
  columns: NumbersTableColumn[];
  data: Record<string, PerYearStats>;
}

export default function StatsNumbersTable(props: StatsNumbersTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th className={styles.total}>Book(s)</th>
          {props.columns.map((x) => (
            <th key={x.header} className={styles.numberStat}>
              {x.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(props.data)
          .sort((b, a) => a.localeCompare(b))
          .map((year) => {
            const row = props.data[year];

            return (
              <tr key={year}>
                <td className={styles.year}>{year}</td>
                <td className={styles.total} data-column-title="Book(s)">
                  {row.total}
                </td>
                {props.columns.map((x) => {
                  const value = row[x.key];
                  const isNumber = typeof value === 'number';
                  const renderValue = isNumber ? value : value.days;
                  const title = isNumber ? undefined : value.title;

                  return (
                    <td
                      key={x.header}
                      className={styles.numberStat}
                      data-column-title={x.header}
                      title={title}
                    >
                      {renderValue}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
