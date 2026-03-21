'use server';

import { toggleBookInRepeatShortlist } from '@/database/readlist';

export default async function onToggleRepeatShortlist(formData: FormData) {
  const bookId = formData.get('bookId') as string;
  const response = await toggleBookInRepeatShortlist(bookId);
  if (!response) {
    throw new Error(`Failed to toggle Book in Repeat Shortlist`);
  }
}
