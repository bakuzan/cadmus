'use server';
import { revalidatePath } from 'next/cache';

import { addSeries } from '@/database/series';

export default async function onAddSeries(formData: FormData) {
  const name = formData.get('name') as string;

  const response = await addSeries(name);
  if (response.success) {
    revalidatePath(`/series`);
  } else {
    throw new Error(response.message);
  }
}
