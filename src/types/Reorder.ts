export type ReorderRecord = {
  bookId: number;
  position: number;
};

export type ReorderPayload = Array<ReorderRecord>;
