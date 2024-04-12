import { BookInLibraryViewModel } from '@/types/Books';

import InLibraryIcon from '@/components/InLibraryIcon';

import styles from './BookInfoTable.module.css';

interface BookInfoTableProps {
  book: BookInLibraryViewModel;
}

export default function BookInfoTable({ book }: BookInfoTableProps) {
  return (
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
  );
}
