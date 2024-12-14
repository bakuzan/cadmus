import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';

import { getBookById, toggleBookInLibrary } from '@/database/books';
import { getHistoryByBookId } from '@/database/history';
import { getSeries } from '@/database/series';
import getPageTitle from '@/utils/getPageTitle';

import ImageWithFallback from '@/components/ImageWithFallback';
import List from '@/components/List';
import BookInfoTable from '@/components/BookInfoTable';
import AddHistory from '@/components/AddHistory';
import UpdateHistory from '@/components/UpdateHistory';

import styles from './page.module.css';

type Props = {
  params: Promise<{ id: string }>;
  //   searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const book = await getBookById(params.id);

  return {
    title: getPageTitle(book.title)
  };
}

export default async function BookById(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const book = await getBookById(params.id);
  const history = await getHistoryByBookId(params.id);
  const series = await getSeries();

  async function onSubmit(formData: FormData) {
    'use server';

    const bookId = formData.get('bookId') as string;
    const response = await toggleBookInLibrary(bookId);
    if (response) {
      revalidatePath(`/books/${bookId}`);
    }
  }

  return (
    <>
      <section className={styles.bookInfo}>
        <header>
          <h1>{book.title}</h1>
          <p className={styles.muted}>{book.author}</p>
        </header>
        <form
          className={styles.form}
          id="library"
          name="library"
          action={onSubmit}
        >
          <input type="hidden" name="bookId" value={book.id} />

          <button
            type="submit"
            className={book.inLibrary ? 'danger' : 'primary'}
          >
            {book.inLibrary ? 'Remove from Library' : 'Add to Library'}
          </button>
        </form>
        <div className={styles.wrapper}>
          <ImageWithFallback
            className={styles.image}
            src={`/api/image/${book.isbn13}`}
            alt={`Cover for ${book.title}, published by ${book.publisher}`}
            priority={false}
            width={160}
            height={245}
          />
          <BookInfoTable book={book} series={series} />
        </div>
      </section>
      <section className={styles.historyInfo}>
        <header>
          <h2>History</h2>
        </header>
        <AddHistory bookId={book.id} />
        <hr />
        <List>
          {history.map((h) => (
            <li key={h.id}>
              <UpdateHistory data={h} />
            </li>
          ))}
        </List>
      </section>
    </>
  );
}
