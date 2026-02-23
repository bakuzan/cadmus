// Database model
export interface Book {
  Id: number;
  Title: string;
  ISBN13: string | null;
  ISBN10: string | null;
  Author: string;
  Binding: string;
  Publisher: string | null;
  Published: string | null;
}

export interface BookInLibrary extends Book {
  LibraryId: number | null;
  SeriesId: number | null;
  BookCount: number;
}

// View model
export interface BookViewModel {
  id: number;
  title: string;
  isbn13: string;
  isbn10: string;
  author: string;
  binding: string;
  publisher: string;
  published: string;
}

export interface BookInLibraryViewModel extends BookViewModel {
  inLibrary: boolean;
  seriesId: number | null;
  bookCount: number;
}

export interface BookSimpleViewModel {
  id: number;
  title: string;
}
