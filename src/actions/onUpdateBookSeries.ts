'use server';
import { revalidatePath } from 'next/cache';

import { updateBookSeries } from '@/database/booksSeries';

export default async function onUpdateBookSeries(formData: FormData) {
  const bookId = formData.get('bookId') as string;
  const seriesId = formData.get('seriesId') as string;

  const response = await updateBookSeries(bookId, seriesId);
  if (response) {
    revalidatePath(`/book/${bookId}`);
  }
}
