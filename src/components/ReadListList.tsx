'use client';
import { useRouter } from 'next/navigation';

import List from '@/components/List';
import BookBlock from '@/components/BookBlock';
import DateBlock from '@/components/DateBlock';
import AddRepeatShortlist from '@/components/AddRepeatShortlist';

import { ReadListHistoryViewModel } from '@/types/ReadList';

import styles from './ReadListList.module.css';

interface ReadListListProps {
  items: Array<ReadListHistoryViewModel>;
  includeShortlistButton?: boolean;
}

export default function ReadListList(props: ReadListListProps) {
  const router = useRouter();

  return (
    <List>
      {props.items.map((x) => (
        <li key={x.historyId} className={styles.listItem}>
          <div className={styles.core}>
            <BookBlock book={x} />
            <DateBlock startDate={x.startDate} endDate={x.endDate} />
          </div>
          {props.includeShortlistButton && (
            <div className={styles.action}>
              <AddRepeatShortlist
                bookId={x.bookId}
                bookInShortlist={!!x.repeatShortlistId}
                onSuccess={() => router.refresh()}
              />
            </div>
          )}
        </li>
      ))}
    </List>
  );
}
