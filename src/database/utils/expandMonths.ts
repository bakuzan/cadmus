import formatMonth from './formatMonth';

export default function expandMonths(start: Date, end: Date): string[] {
  const months: string[] = [];

  const cur = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);

  while (cur <= last) {
    months.push(formatMonth(cur));
    cur.setMonth(cur.getMonth() + 1);
  }

  return months;
}
