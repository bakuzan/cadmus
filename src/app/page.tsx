import React from 'react';

import { getFullHistory } from '@/database/history';
import { ImageDisplayMode } from '@/constants/imageDisplayMode';
import BookHistoryTable from '@/components/BookHistoryTable';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const history = await getFullHistory();
  console.log(history);
  return (
    <>
      <h1>Book Read History</h1>
      <BookHistoryTable
        history={history}
        includeYearRows={true}
        imageDisplayMode={ImageDisplayMode.ONGOING_ONLY}
      />
    </>
  );
}
