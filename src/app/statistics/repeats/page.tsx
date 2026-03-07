import React from 'react';

import { getBookRepeats } from '@/database/statistics';

import getPageTitle from '@/utils/getPageTitle';
import StatsRepeatsTable from '@/components/StatsRepeatsTable';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Repeats')
};

export default async function Repeats() {
  const repeats = await getBookRepeats();

  return (
    <>
      <h1>Repeats</h1>
      <div>
        <StatsRepeatsTable repeats={repeats} />
      </div>
    </>
  );
}
