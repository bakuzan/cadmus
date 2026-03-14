'use client';

import List from '@/components/List';
import BookBlock from '@/components/BookBlock';
import DateBlock from '@/components/DateBlock';

import { ReadListHistoryViewModel } from '@/types/ReadList';

import styles from './ReadListList.module.css';

interface ReadListListProps {
  items: Array<ReadListHistoryViewModel>;
}

export default function ReadListList(props: ReadListListProps) {
  return (
    <List>
      {props.items.map((x) => (
        <li key={x.historyId} className={styles.listItem}>
          <BookBlock book={x} />
          <DateBlock startDate={x.startDate} endDate={x.endDate} />
        </li>
      ))}
    </List>
  );
}
