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
