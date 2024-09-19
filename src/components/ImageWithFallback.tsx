'use client';
import Image, { ImageProps } from 'next/image';
import { useState, useEffect, SyntheticEvent } from 'react';

type ImageWithFallbackProps = ImageProps & {
  fallbackImage?: string;
};

export default function ImageWithFallback({
  fallbackImage = '/missing_cover.png',
  src,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<SyntheticEvent<HTMLImageElement> | null>(
    null
  );

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      onError={(e) => setError(e)}
      alt={alt}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
}
