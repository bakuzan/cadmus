import React from 'react';

import {
  getBookCountByYear,
  getBooksWithYearsAgo
} from '@/database/statistics';

import getPageTitle from '@/utils/getPageTitle';

import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: getPageTitle('Statistics')
};

export default async function Statistics() {
  const yearCounts = await getBookCountByYear();
  const yearsAgoList = await getBooksWithYearsAgo();

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
                <th>Average Days</th>
              </tr>
            </thead>
            <tbody>
              {yearCounts.map((row) => (
                <tr key={row.year}>
                  <td className={styles.year}>{row.year}</td>
                  <td className={styles.total} data-column-title="Book(s)">
                    {row.total}
                  </td>
                  <td
                    className={styles.averageDays}
                    data-column-title="Average Days"
                  >
                    {row.averageDays}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What Were You Reading?</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Years Ago</th>
              </tr>
            </thead>
            <tbody>
              {yearsAgoList
                .filter((x) => x.isExact)
                .map((row) => (
                  <tr key={row.bookId}>
                    <td className={styles.title} data-column-title="Book">
                      {row.title}
                    </td>
                    <td className={styles.author} data-column-title="Author">
                      {row.author}
                    </td>
                    <td
                      className={styles.yearsAgo}
                      data-column-title="Years Ago"
                    >
                      {row.yearsAgo}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What To Re-Read?</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Years Ago</th>
              </tr>
            </thead>
            <tbody>
              {yearsAgoList
                .filter((x) => !x.isExact)
                .map((row) => (
                  <tr key={row.bookId}>
                    <td className={styles.title} data-column-title="Book">
                      {row.title}
                    </td>
                    <td className={styles.author} data-column-title="Author">
                      {row.author}
                    </td>
                    <td
                      className={styles.yearsAgo}
                      data-column-title="Years Ago"
                    >
                      {row.yearsAgo}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
