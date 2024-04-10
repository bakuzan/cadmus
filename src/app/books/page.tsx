import { getBooks } from '@/database/books';

import getPageTitle from '@/utils/getPageTitle';

import BookList from '@/app/books/components/BookList';

export const metadata = {
  title: getPageTitle('Books')
};

export default async function Books() {
  const books = await getBooks();

  return (
    <>
      <h1>Books</h1>
      <BookList data={books} />
    </>
  );
}
