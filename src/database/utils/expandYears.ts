export default function expandYears(start: Date, end: Date): string[] {
  const years: string[] = [];
  let y = start.getFullYear();
  const endYear = end.getFullYear();

  while (y <= endYear) {
    years.push(String(y));
    y++;
  }

  return years;
}
