'use client';

import Link from 'next/link';

import styles from './BookBlock.module.css';
import concat from '@/utils/concat';

interface BookBlockProps {
  book: {
    bookId: number;
    title: string;
    author: string;
    seriesName: string | null;
  };
}

export default function BookBlock({ book }: BookBlockProps) {
  const isDummy = book.bookId <= 0;

  return (
    <div className={concat('dataColumn', styles.dataColumn)}>
      {isDummy ? (
        <div>{book.title}</div>
      ) : (
        <Link href={`/books/${book.bookId}`}>{book.title}</Link>
      )}
      <div className={styles.metadata}>
        <div className="muted">{book.author}</div>
        {book.seriesName && <div className="muted">({book.seriesName})</div>}
      </div>
    </div>
  );
}
