'use server';
import { revalidatePath } from 'next/cache';

import { updateReadHistory } from '@/database/history';

export default async function onUpdateHistory(formData: FormData) {
  const historyId = formData.get('id') as string;
  const bookId = formData.get('bookId') as string;
  const startDate = formData.get('startDate') as string;
  const rawEndDate = formData.get('endDate');
  const endDate = rawEndDate ? (rawEndDate as string) : null;

  const response = await updateReadHistory({ historyId, startDate, endDate });

  if (response) {
    revalidatePath(`/books/${bookId}`);
    return { message: `Record updated.` };
  }

  throw new Error(`Something went wrong!`);
}
