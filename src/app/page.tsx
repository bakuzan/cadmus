import React from 'react';

import { getBookHistoryYearStats } from '@/database/statistics';
import { getFullHistory } from '@/database/history';

import { ImageDisplayMode } from '@/constants/imageDisplayMode';
import BookHistoryTable from '@/components/BookHistoryTable';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const history = await getFullHistory();
  const yearStats = await getBookHistoryYearStats();
  console.log(history);
  return (
    <>
      <h1>Book Read History</h1>
      <BookHistoryTable
        history={history}
        yearStats={yearStats}
        imageDisplayMode={ImageDisplayMode.ONGOING_ONLY}
      />
    </>
  );
}
