export default function computeStandardDeviation(
  totalBooks: number,
  totalDays: number,
  dayValues: number[]
) {
  const mean = totalDays / totalBooks;

  const variance =
    dayValues.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) /
    dayValues.length;

  return Number(Math.sqrt(variance).toFixed(2));
}
