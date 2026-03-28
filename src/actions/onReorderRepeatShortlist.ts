'use server';

import { reorderRepeatShortlist } from '@/database/readlist';

export default async function onReorderRepeatShortlist(
  items: Array<{ bookId: number; position: number }>
) {
  const response = await reorderRepeatShortlist(items);
  if (!response) {
    throw new Error(`Failed to reorder Repeat Shortlist`);
  }
}
