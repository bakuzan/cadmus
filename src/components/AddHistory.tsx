import { revalidatePath } from 'next/cache';

import { addReadHistory } from '@/database/history';

import styles from './AddHistory.module.css';

interface AddHistoryProps {
  bookId: number;
}

export default function AddHistory(props: AddHistoryProps) {
  const today = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  async function onSubmit(formData: FormData) {
    'use server';

    const bookId = formData.get('bookId') as string;
    const startDate = formData.get('startDate') as string;
    console.log({ bookId, startDate });
    const response = await addReadHistory(bookId, startDate);
    if (response) {
      revalidatePath(`/books/${bookId}`);
    }
  }

  return (
    <form
      className={styles.form}
      id="addHistory"
      name="addHistory"
      action={onSubmit}
    >
      <input type="hidden" name="bookId" value={props.bookId} />

      <label className={styles.label}>
        Start Date
        <input
          className={styles.input}
          type="date"
          name="startDate"
          defaultValue={today}
          required
        />
      </label>

      <button type="submit" className="primary">
        Add history
      </button>
    </form>
  );
}
