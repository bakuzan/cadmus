export default function computeMedianDays(dayValues: number[]) {
  dayValues.sort((a, b) => a - b);

  let medianDays: number;
  const mid = Math.floor(dayValues.length / 2);

  if (dayValues.length % 2 === 0) {
    medianDays = Math.round((dayValues[mid - 1] + dayValues[mid]) / 2);
  } else {
    medianDays = dayValues[mid];
  }

  return medianDays;
}
