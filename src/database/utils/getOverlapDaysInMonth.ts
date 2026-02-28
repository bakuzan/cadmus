export default function getOverlapDaysInMonth(
  start: Date,
  end: Date,
  month: string
): number {
  const [year, monthIndex] = month.split('-').map(Number);
  const monthStart = new Date(year, monthIndex - 1, 1);
  const monthEnd = new Date(year, monthIndex, 0); // last day of month

  const overlapStart = new Date(
    Math.max(start.getTime(), monthStart.getTime())
  );
  const overlapEnd = new Date(Math.min(end.getTime(), monthEnd.getTime()));

  if (overlapEnd < overlapStart) {
    return 0;
  }

  return (overlapEnd.getTime() - overlapStart.getTime()) / 86400000 + 1;
}
