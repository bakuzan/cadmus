import { GroupedBookHistory } from '@/types/Stats';

export function filterBooks(searchString: string) {
  const terms = searchString.toLowerCase().trim().split(' ');

  return function (value: GroupedBookHistory) {
    return terms.every(
      (t) =>
        value.title.toLowerCase().includes(t) ||
        value.author.toLowerCase().includes(t) ||
        value.seriesName?.toLowerCase().includes(t)
    );
  };
}
