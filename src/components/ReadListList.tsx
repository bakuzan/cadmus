'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable, isSortable } from '@dnd-kit/react/sortable';

import List from '@/components/List';
import BookBlock from '@/components/BookBlock';
import DateBlock from '@/components/DateBlock';
import AddRepeatShortlist from '@/components/AddRepeatShortlist';

import useToast from '@/hooks/useToast';

import { ReadListHistoryViewModel } from '@/types/ReadList';
import { ReorderPayload } from '@/types/Reorder';

import { reorder } from '@/utils/reorder';
import { extractReorderPayload } from '@/utils/extractReorderPayload';

import styles from './ReadListList.module.css';

type OnDragEnd = NonNullable<
  React.ComponentProps<typeof DragDropProvider>['onDragEnd']
>;

type DragEndEvent = Parameters<OnDragEnd>[0];

interface ReadListListProps {
  items: Array<ReadListHistoryViewModel>;
  includeShortlistButton?: boolean;
  listLimit?: number;
  reorderableAction?: (payload: ReorderPayload) => Promise<void>;
}

interface ReadListListItemProps {
  index: number;
  data: ReadListHistoryViewModel;
  reorderable: boolean;
  onRemove?: () => void;
}

function ReadListListItem(props: ReadListListItemProps) {
  const { data: item, index, reorderable } = props;
  const sortable = useSortable({ id: item.bookId, index });

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
            bookInShortlist={!!item.shortlistId}
            onSuccess={props.onRemove}
          />
        </div>
      )}
    </li>
  );
}

export default function ReadListList(props: ReadListListProps) {
  const { listLimit, reorderableAction } = props;
  const reorderable = !!reorderableAction;

  const [localItems, setLocalItems] = React.useState(props.items);
  const [showAll, setShowAll] = React.useState(
    !listLimit || listLimit >= props.items.length
  );

  const toast = useToast();
  const router = useRouter();

  const refreshPage = props.includeShortlistButton
    ? () => router.refresh()
    : undefined;

  const filteredItems = showAll ? localItems : localItems.slice(0, listLimit);

  const content = (
    <List>
      {filteredItems.map((x, i) => (
        <ReadListListItem
          key={x.bookId}
          index={i}
          data={x}
          reorderable={reorderable}
          onRemove={refreshPage}
        />
      ))}
      {!showAll && (
        <li key="SHOWALL" className={`${styles.listItem} show-all`}>
          <button
            type="button"
            className={styles.showAllBtn}
            onClick={() => setShowAll(true)}
          >
            Show All
          </button>
        </li>
      )}
    </List>
  );

  return reorderable ? (
    <DragDropProvider
      onDragEnd={(event: DragEndEvent) => {
        if (event.canceled) {
          return;
        }

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index } = source;

          if (initialIndex !== index) {
            // Update local order
            const newItems = reorder(localItems, initialIndex, index);
            setLocalItems(newItems);
            // Send update to server
            const payload = extractReorderPayload(newItems);
            reorderableAction(payload).catch(() => {
              toast('error', 'Failed to reorder Repeat Shortlist');
              refreshPage?.();
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
