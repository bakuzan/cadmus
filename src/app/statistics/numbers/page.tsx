import React from 'react';

import { getBookHistoryYearStats } from '@/database/statistics';

import getPageTitle from '@/utils/getPageTitle';

import styles from './page.module.css';
import StatsNumbersTable from '@/components/StatsNumbersTable';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('The Numbers')
};

export default async function TheNumbers() {
  const yearStats = await getBookHistoryYearStats();

  return (
    <>
      <h1>The Numbers</h1>
      <div className={styles.container}>
        <StatsNumbersTable
          data={yearStats}
          columns={[
            { header: 'Mean Days', key: 'averageDays' },
            { header: 'Median Days', key: 'medianDays' },
            { header: 'Std Dev', key: 'stdDev' },
            { header: 'Minimum Days', key: 'minDays' },
            { header: 'Maximum Days', key: 'maxDays' },
            { header: 'Density', key: 'density' }
          ]}
        />
        <StatsNumbersTable
          data={yearStats}
          columns={[
            { header: 'First Time Reads', key: 'firstTimeReads' },
            { header: 'Repeats', key: 'repeats' },
            { header: 'Repeat Ratio', key: 'repeatRatio' }
          ]}
        />
      </div>
    </>
  );
}
