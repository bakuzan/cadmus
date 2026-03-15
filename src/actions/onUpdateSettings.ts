'use server';
import { revalidatePath } from 'next/cache';

import { updateSettings } from '@/database/settings';

export default async function onUpdateSettings(formData: FormData) {
  const readList_RepeatFrequency = formData.get(
    'readList_RepeatFrequency'
  ) as string;

  const response = await updateSettings({
    readList_RepeatFrequency: Number(readList_RepeatFrequency)
  });

  if (response) {
    revalidatePath(`/settings`);
    return { message: `Record updated.` };
  }

  throw new Error(`Something went wrong!`);
}
