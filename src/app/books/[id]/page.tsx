import { Metadata } from 'next';

import { getBookById } from '@/database/books';

import getPageTitle from '@/utils/getPageTitle';

import styles from './page.module.css';

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

  return (
    <>
      <section className={styles.bookInfo}>
        <header>
          <h1>{book.title}</h1>
          <p className={styles.muted}>{book.author}</p>
        </header>
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
          </tbody>
        </table>
        <form id="library" name="library">
          TODO add physical tickbox
        </form>
      </section>
      <section className={styles.historyInfo}>
        <header>
          <h2>History</h2>
        </header>
        <p>
          TODO Here will be a list of all the read instances, topped with an add
          form
        </p>
      </section>
    </>
  );
}
