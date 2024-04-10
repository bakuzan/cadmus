'use client';
import { useState } from 'react';
import Link from 'next/link';

import List from '@/components/List';
import SearchBox from '@/components/SearchBox';

import { BookViewModel } from '@/types/Books';

import styles from './BookList.module.css';

function filterBooks(searchString: string) {
  const terms = searchString.toLowerCase().trim().split(' ');

  return function (value: BookViewModel) {
    return terms.some(
      (t) =>
        value.title.toLowerCase().includes(t) ||
        value.author.toLowerCase().includes(t) ||
        value.isbn13.toLowerCase().includes(t) ||
        value.isbn10.toLowerCase().includes(t)
    );
  };
}

export default function BookList({ data }: { data: BookViewModel[] }) {
  const [searchString, setSearchString] = useState('');
  const books = data.filter(filterBooks(searchString));

  return (
    <>
      <SearchBox value={searchString} onChange={(v) => setSearchString(v)} />
      <List>
        {books.map((x) => (
          <li key={x.id} className={styles.item}>
            <Link href={`/books/${x.id}`}>{x.title}</Link>
            <div className={styles.metadata}>
              <div>{x.author}</div>
              <div>(Edition Published: {x.published})</div>
            </div>
          </li>
        ))}
      </List>
    </>
  );
}
