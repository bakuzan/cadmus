import { revalidatePath } from 'next/cache';

import { addReadHistory } from '@/database/history';
import concat from '@/utils/concat';
import { getTodayYYYYMMDD } from '@/utils/date';

import styles from './AddHistory.module.css';

interface AddHistoryProps {
  bookId: number;
}

export default function AddHistory(props: AddHistoryProps) {
  const today = getTodayYYYYMMDD();

  async function onSubmit(formData: FormData) {
    'use server';

    const bookId = formData.get('bookId') as string;
    const startDate = formData.get('startDate') as string;

    const response = await addReadHistory(bookId, startDate);
    if (response) {
      revalidatePath(`/books/${bookId}`);
    }
  }

  return (
    <form
      className={concat(styles.form, styles.formShrink)}
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
