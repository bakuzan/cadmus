import React from 'react';

import { getBookRepeats } from '@/database/statistics';

import getPageTitle from '@/utils/getPageTitle';

// import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Repeats')
};

export default async function Repeats() {
  const repeats = await getBookRepeats();
  console.log(repeats);
  /** TODO
   * 1) Render the repeats
   *    a) Display in table (in library, title, repeats, latest repeat date)
   *    b) Expand rows on clicking the repeats column
   * 2) Make sortable (asc/desc):(title, repeats, latest repeate date)
   * 3) Add a search filter
   */
  return (
    <>
      <h1>Repeats</h1>
      <div>Placeholder for the repeats work to come...</div>
    </>
  );
}
