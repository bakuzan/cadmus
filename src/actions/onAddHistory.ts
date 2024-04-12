'use server';
import { revalidatePath } from 'next/cache';

import { addReadHistory } from '@/database/history';

export default async function onAddHistory(formData: FormData) {
  const bookId = formData.get('bookId') as string;
  const startDate = formData.get('startDate') as string;

  const response = await addReadHistory(bookId, startDate);
  if (response) {
    revalidatePath(`/books/${bookId}`);
  }
}
