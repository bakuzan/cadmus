import { ReadListHistory } from '@/types/ReadList';

export default function computeCyclePosition(
  rows: ReadListHistory[],
  cycle: number
) {
  let countSinceReread = 0;

  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    const isReread = row.ReadNumber > 1;

    if (isReread) {
      break;
    }

    countSinceReread++;

    // We never care about more than cycle-1 new reads
    if (countSinceReread === cycle - 1) {
      break;
    }
  }

  return countSinceReread;
}
