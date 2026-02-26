import React from 'react';

import getPageTitle from '@/utils/getPageTitle';
import { getBookHistoryMonthCounts } from '@/database/statistics';

import StatsMonthCountsTable from '@/components/StatsMonthCountsTable';

// import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('History')
};

const KNOWN_START_YEAR = 2020;

export default async function History() {
  const monthTotals = await getBookHistoryMonthCounts();
  const monthCountsMap = new Map(Object.entries(monthTotals));
  const currentYear = new Date().getFullYear();
  const years = Array(currentYear - KNOWN_START_YEAR + 1)
    .fill(currentYear)
    .map((y, i) => y - i);

  return (
    <>
      <h1>History</h1>
      <div>
        <StatsMonthCountsTable
          years={years}
          monthCounts={monthCountsMap}
          maxMonthCount={Math.max(
            ...Array.from(monthCountsMap.entries()).map(
              ([_, values]) => values.length
            )
          )}
        />
      </div>
    </>
  );
}
