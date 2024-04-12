import { BookSimpleViewModel } from './Books';

// Database model
export interface Series {
  Id: number;
  Name: string;
}

// View model
export interface SeriesViewModel {
  id: number;
  name: string;
}

export interface SeriesWithBooksViewModel extends SeriesViewModel {
  books: BookSimpleViewModel[];
}

// Requests
export interface SeriesUpdateRequest {
  seriesId: string;
  name: string;
}
