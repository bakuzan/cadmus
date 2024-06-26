// Database model
export interface Book {
  Id: number;
  Title: string;
  ISBN13: string;
  ISBN10: string;
  Author: string;
  Binding: string;
  Publisher: string;
  Published: string;
}

export interface BookInLibrary extends Book {
  LibraryId: number | null;
  SeriesId: number | null;
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
}

export interface BookSimpleViewModel {
  id: number;
  title: string;
}
