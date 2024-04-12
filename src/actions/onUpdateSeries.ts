'use server';
import { revalidatePath } from 'next/cache';

import { updateSeries } from '@/database/series';

export default async function onUpdateSeries(formData: FormData) {
  const seriesId = formData.get('id') as string;
  const name = formData.get('name') as string;

  const response = await updateSeries({ seriesId, name });

  if (response.success) {
    revalidatePath(`/series`);
    return { message: `Record updated.` };
  } else {
    throw new Error(response.message);
  }
}
