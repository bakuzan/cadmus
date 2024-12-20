'use client';

import { useRef } from 'react';

import useKeyPress from '@/hooks/useKeyPress';

import styles from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox(props: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useKeyPress(['s', 'S'], (event) => {
    // If we are not currently focussed on an input, then steal focus to SearchBox
    if (!document.activeElement || document.activeElement.tagName !== 'INPUT') {
      event.preventDefault();
      inputRef.current?.focus();
    }
  });

  return (
    <div className={styles.searchBox}>
      <label htmlFor="search" className={styles.label}>
        Search
      </label>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        id="search"
        name="searchString"
        placeholder="Enter text to filter the list"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
