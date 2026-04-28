"use client";

import * as React from "react";

export function useTextReveal(text: string) {
  const words = React.useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text]);
  const wordRefs = React.useRef<Array<HTMLSpanElement | null>>([]);

  const setWordRef = React.useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      wordRefs.current[index] = el;
    },
    []
  );

  return { words, wordRefs, setWordRef };
}
