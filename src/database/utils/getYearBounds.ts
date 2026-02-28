export default function getYearBounds(year: string | number) {
  const y = Number(year);
  const start = new Date(y, 0, 1); // Jan 1, 00:00
  const end = new Date(y + 1, 0, 1); // Jan 1 next year, exclusive
  return { start, end };
}
