import { useEffect, useRef } from "react";

// Custom Hook
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function fn() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setTimeout(fn, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

