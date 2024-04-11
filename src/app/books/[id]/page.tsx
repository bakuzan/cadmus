import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

import { getBookById, toggleBookInLibrary } from '@/database/books';
import getPageTitle from '@/utils/getPageTitle';

import InLibraryIcon from '@/components/InLibraryIcon';

import styles from './page.module.css';
import AddHistory from '@/components/AddHistory';

type Props = {
  params: { id: string };
  //   searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBookById(params.id);

  return {
    title: getPageTitle(book.title)
  };
}

export default async function BookById({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id);

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
          <Image
            className={styles.image}
            src={`/api/image/${book.isbn13}`}
            alt={`Cover for ${book.title}, published by ${book.publisher}`}
            width={160}
            height={245}
          />
          <table className={styles.bookTable}>
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <strong>ISBN-13</strong>
                </th>
                <td>{book.isbn13}</td>
              </tr>
              <tr>
                <th>
                  <strong>ISBN-10</strong>
                </th>
                <td>{book.isbn10}</td>
              </tr>
              <tr>
                <th>
                  <strong>Binding</strong>
                </th>
                <td>{book.binding}</td>
              </tr>
              <tr>
                <th>
                  <strong>Publisher</strong>
                </th>
                <td>{book.publisher}</td>
              </tr>
              <tr>
                <th>
                  <strong>Published</strong>
                </th>
                <td>{book.published}</td>
              </tr>
              <tr className={styles.noHover}>
                <th>
                  <strong>In Library?</strong>
                </th>
                <td>
                  <InLibraryIcon isIn={book.inLibrary} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.historyInfo}>
        <header>
          <h2>History</h2>
        </header>
        <AddHistory bookId={book.id} />
        <p>TODO Here will be a list of all the read instances</p>
      </section>
    </>
  );
}
