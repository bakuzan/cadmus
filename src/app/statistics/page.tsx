import React from 'react';

import { getBookCountByYear } from '@/database/statistics';

import getPageTitle from '@/utils/getPageTitle';

import styles from './page.module.css';

export const metadata = {
  title: getPageTitle('Statistics')
};

export default async function Statistics() {
  const yearCounts = await getBookCountByYear();

  return (
    <>
      <h1>Statistics</h1>
      <div className={styles.grid}>
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Book(s)</th>
              </tr>
            </thead>
            <tbody>
              {yearCounts.map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td className={styles.total}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
