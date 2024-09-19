import {
  Book,
  BookInLibrary,
  BookInLibraryViewModel,
  BookViewModel
} from '@/types/Books';

export function toBookViewModel(book: Book): BookViewModel {
  return {
    id: book.Id,
    title: book.Title,
    isbn13: book.ISBN13 ?? '-',
    isbn10: book.ISBN10 ?? '-',
    author: book.Author,
    binding: book.Binding,
    publisher: book.Publisher ?? '-',
    published: book.Published ?? ''
  };
}

export function toBookInLibraryViewModel(
  book: BookInLibrary
): BookInLibraryViewModel {
  const item = toBookViewModel(book);
  const inLibrary = book.LibraryId !== null;

  return {
    ...item,
    inLibrary,
    seriesId: book.SeriesId
  };
}
