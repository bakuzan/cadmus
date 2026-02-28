export type BucketDuration = { key: string; days: number };
export type BucketAllocation = { key: string; value: number };

export default function allocateWholeBooks(
  buckets: BucketDuration[],
  bookCount: number
): BucketAllocation[] {
  const totalDays = buckets.reduce((a, b) => a + b.days, 0);

  // Step 1: raw proportional weights
  const rawWeights = buckets.map((b) => ({
    key: b.key,
    raw: (bookCount * b.days) / totalDays
  }));

  // Step 2: round to nearest whole number
  let rounded = rawWeights.map((w) => ({
    key: w.key,
    value: Math.round(w.raw)
  }));

  // Step 3: fix rounding drift
  let sum = rounded.reduce((a, b) => a + b.value, 0);

  if (sum !== bookCount) {
    const diff = bookCount - sum;

    const sorted = rawWeights
      .map((w, i) => ({
        index: i,
        key: w.key,
        remainder: w.raw - Math.floor(w.raw)
      }))
      .sort((a, b) => b.remainder - a.remainder);

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        rounded[sorted[i].index].value += 1;
      }
    } else {
      for (let i = 0; i < -diff; i++) {
        rounded[sorted[i].index].value -= 1;
      }
    }
  }

  return rounded;
}
