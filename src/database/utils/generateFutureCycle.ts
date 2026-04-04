import { ReadListHistory } from '@/types/ReadList';

function makePlaceholder(isReread: boolean, counter: number): ReadListHistory {
  const title = isReread ? 'Re-read Book' : 'New Book';
  const uniqueId = -(counter + 1);

  return {
    HistoryId: uniqueId,
    StartDate: '',
    EndDate: null,
    BookId: uniqueId,
    ISBN13: '',
    Title: `[${title}]`,
    Author: '',
    SeriesName: null,
    ReadNumber: isReread ? 1 : 0,
    ShortlistId: null
  };
}

export default function generateFutureCycle(
  cyclePos: number,
  cycle: number,
  unreadBooks: Array<ReadListHistory>,
  rereadBooks: Array<ReadListHistory>
) {
  const result: Array<ReadListHistory> = [];

  let unreadIndex = 0;
  let rereadIndex = 0;

  for (let i = 0; i < cycle; i++) {
    const pos = (cyclePos + i) % cycle;
    const isReread = pos === cycle - 1;

    let item: ReadListHistory | undefined = isReread
      ? rereadBooks[rereadIndex++]
      : unreadBooks[unreadIndex++];

    if (!item) {
      item = makePlaceholder(isReread, i);
    } else if (item.HistoryId === 0) {
      item = { ...item, HistoryId: -(i + 1) };
    }

    result.push(item);
  }

  return result;
}
