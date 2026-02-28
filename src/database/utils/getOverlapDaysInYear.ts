import getYearBounds from './getYearBounds';

export default function getOverlapDaysInYear(
  start: Date,
  end: Date,
  year: string | number
): number {
  const { start: yStart, end: yEnd } = getYearBounds(year);

  const s = start < yStart ? yStart : start;
  const e = end > yEnd ? yEnd : end;

  const ms = e.getTime() - s.getTime();
  if (ms < 0) {
    return 0;
  }

  return Math.round(ms / (1000 * 60 * 60 * 24));
}
