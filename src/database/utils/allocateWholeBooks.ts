/**
 * Allocate whole books across months based on proportional day weights.
 * Ensures:
 *  - No fractional books
 *  - Total allocated == bookCount
 *  - Largest remainder method for drift correction
 */
export default function allocateWholeBooks(
  monthDurations: { month: string; days: number }[],
  bookCount: number
): { month: string; value: number }[] {
  const totalDays = monthDurations.reduce((a, b) => a + b.days, 0);

  // Step 1: compute raw proportional weights
  const rawWeights = monthDurations.map((md) => ({
    month: md.month,
    raw: (bookCount * md.days) / totalDays
  }));

  // Step 2: round to nearest whole number
  let rounded = rawWeights.map((w) => ({
    month: w.month,
    value: Math.round(w.raw)
  }));

  // Step 3: fix rounding drift
  let sum = rounded.reduce((a, b) => a + b.value, 0);

  if (sum !== bookCount) {
    const diff = bookCount - sum;

    // Sort by largest fractional remainder
    const sorted = rawWeights
      .map((w, i) => ({
        index: i,
        month: w.month,
        remainder: w.raw - Math.floor(w.raw)
      }))
      .sort((a, b) => b.remainder - a.remainder);

    if (diff > 0) {
      // Need to add books
      for (let i = 0; i < diff; i++) {
        rounded[sorted[i].index].value += 1;
      }
    } else {
      // Need to remove books
      for (let i = 0; i < -diff; i++) {
        rounded[sorted[i].index].value -= 1;
      }
    }
  }

  return rounded;
}
