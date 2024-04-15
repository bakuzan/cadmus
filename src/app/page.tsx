import Image from 'next/image';
import Link from 'next/link';

import { getFullHistory } from '@/database/history';

import styles from './page.module.css';
import { formatDateForDisplay } from '@/utils/date';

export default async function Home() {
  const history = await getFullHistory();

  return (
    <>
      <h1>Complete Read History</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Book</th>
            <th>Dates</th>
          </tr>
        </thead>
        <tbody>
          {history.map((x) => (
            <tr key={x.historyId}>
              <td>
                {!x.endDate && (
                  <Image
                    className={styles.image}
                    src={`/api/image/${x.isbn13}`}
                    alt={`Cover for ${x.title}`}
                    priority={false}
                    width={160}
                    height={245}
                  />
                )}
              </td>
              <td>
                <Link href={`/books/${x.bookId}`}>{x.title}</Link>
                <div className={styles.metadata}>
                  <div className="muted">{x.author}</div>
                  <div className="muted">{x.seriesName}</div>
                </div>
              </td>
              <td>
                <div className={styles.dates}>
                  <div>{formatDateForDisplay(x.startDate)}</div>
                  <div> - </div>
                  <div>
                    {x.endDate ? formatDateForDisplay(x.endDate) : 'Present'}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
