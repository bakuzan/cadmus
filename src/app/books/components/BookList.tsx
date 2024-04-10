'use client';
import { useState } from 'react';
import Link from 'next/link';

import List from '@/components/List';
import SearchBox from '@/components/SearchBox';

import { BookViewModel } from '@/types/Books';

import styles from './BookList.module.css';

export default function BookList({ data }: { data: BookViewModel[] }) {
  const [searchString, setSearchString] = useState('');
  const searchStringLower = searchString.toLowerCase();
  const books = data.filter(
    (x) => x.title.toLowerCase().includes(searchStringLower) // TODO improve this filter
  );

  return (
    <>
      <SearchBox value={searchString} onChange={(v) => setSearchString(v)} />
      <List>
        {books.map((x) => (
          <li key={x.id} className={styles.item}>
            <Link href={`/book/${x.id}`}>{x.title}</Link>
            <div className={styles.muted}>Published: {x.published}</div>
          </li>
        ))}
      </List>
    </>
  );
}
