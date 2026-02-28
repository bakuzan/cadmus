import React from 'react';

import { getBookHistoryYearStats } from '@/database/statistics';

import getPageTitle from '@/utils/getPageTitle';

import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('The Numbers')
};

export default async function TheNumbers() {
  const yearStats = await getBookHistoryYearStats();

  console.log(yearStats);

  return (
    <>
      <h1>The Numbers</h1>
      <div className={styles.grid}>
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th className={styles.total}>Book(s)</th>
                <th className={styles.numberStat}>Average Days</th>
                <th className={styles.numberStat}>Minimum Days</th>
                <th className={styles.numberStat}>Maximum Days</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(yearStats)
                .sort((b, a) => a.localeCompare(b))
                .map((year) => {
                  const row = yearStats[year];

                  return (
                    <tr key={year}>
                      <td className={styles.year}>{year}</td>
                      <td className={styles.total} data-column-title="Book(s)">
                        {row.total}
                      </td>
                      <td
                        className={styles.numberStat}
                        data-column-title="Average Days"
                      >
                        {row.averageDays}
                      </td>
                      <td
                        className={styles.numberStat}
                        data-column-title="Minimum Days"
                      >
                        {row.minDays}
                      </td>
                      <td
                        className={styles.numberStat}
                        data-column-title="Maximum Days"
                      >
                        {row.maxDays}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
