'use server';

import { reorderUnreadShortlist } from '@/database/readlist';

export default async function onReorderUnreadShortlist(
  items: Array<{ bookId: number; position: number }>
) {
  const response = await reorderUnreadShortlist(items);
  if (!response) {
    throw new Error(`Failed to reorder Unread Shortlist`);
  }
}
