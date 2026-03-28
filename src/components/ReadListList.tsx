'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable, isSortable } from '@dnd-kit/react/sortable';

import List from '@/components/List';
import BookBlock from '@/components/BookBlock';
import DateBlock from '@/components/DateBlock';
import AddRepeatShortlist from '@/components/AddRepeatShortlist';

import { ReadListHistoryViewModel } from '@/types/ReadList';

import styles from './ReadListList.module.css';

type OnDragEnd = NonNullable<
  React.ComponentProps<typeof DragDropProvider>['onDragEnd']
>;

type DragEndEvent = Parameters<OnDragEnd>[0];

interface ReadListListProps {
  items: Array<ReadListHistoryViewModel>;
  includeShortlistButton?: boolean;
  reorderable?: boolean;
}

interface ReadListListItemProps {
  index: number;
  data: ReadListHistoryViewModel;
  reorderable: boolean;
  onRemove?: () => void;
}

function ReadListListItem(props: ReadListListItemProps) {
  const { data: item, index, reorderable } = props;
  const sortable = useSortable({ id: item.historyId, index });

  return (
    <li
      ref={reorderable ? sortable.ref : undefined}
      className={styles.listItem}
    >
      {reorderable && (
        <div ref={sortable.handleRef} className={styles.dragHandle}>
          ⋮⋮
        </div>
      )}
      <div className={styles.core}>
        <BookBlock book={item} />
        <DateBlock startDate={item.startDate} endDate={item.endDate} />
      </div>
      {props.onRemove && (
        <div className={styles.action}>
          <AddRepeatShortlist
            bookId={item.bookId}
            bookInShortlist={!!item.repeatShortlistId}
            onSuccess={props.onRemove}
          />
        </div>
      )}
    </li>
  );
}

export default function ReadListList(props: ReadListListProps) {
  const { reorderable = false } = props;
  const [localItems, setLocalItems] = React.useState(props.items);
  const router = useRouter();

  const maybeOnRemove = props.includeShortlistButton
    ? () => router.refresh()
    : undefined;

  const content = (
    <List>
      {localItems.map((x, i) => (
        <ReadListListItem
          key={x.historyId}
          index={i}
          data={x}
          reorderable={reorderable}
          onRemove={maybeOnRemove}
        />
      ))}
    </List>
  );

  return props.reorderable ? (
    <DragDropProvider
      onDragEnd={(event: DragEndEvent) => {
        if (event.canceled) {
          return;
        }

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index } = source;

          if (initialIndex !== index) {
            setLocalItems((items) => {
              const newItems = [...items];
              const [removed] = newItems.splice(initialIndex, 1);
              newItems.splice(index, 0, removed);
              return newItems;
            });
          }
        }
      }}
    >
      {content}
    </DragDropProvider>
  ) : (
    content
  );
}
