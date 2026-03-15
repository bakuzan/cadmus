import { ReadListHistory } from '@/types/ReadList';

export default function computeCyclePosition(
  rows: ReadListHistory[],
  cycle: number
) {
  let distance = 0;

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].ReadNumber > 1) {
      break;
    }

    distance++;
  }

  return distance >= cycle ? cycle - 1 : distance;
}
