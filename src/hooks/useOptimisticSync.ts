import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function useOptimisticSync<T>(
  serverValue: T,
  onCommit: (updatedValue: T) => void
): [T, Dispatch<SetStateAction<T | null>>] {
  const [optimisticValue, setOptimisticValue] = useState<T | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setOptimisticValue(null));
  }, [serverValue]);

  useEffect(() => {
    if (optimisticValue) {
      onCommit(optimisticValue);
    }
  }, [optimisticValue]);

  return [optimisticValue ?? serverValue, setOptimisticValue];
}
