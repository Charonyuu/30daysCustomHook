import { useRef, useEffect, useCallback } from "react";

export function useThrottle(callback, delay) {
  const lastCallRef = useRef(0);
  const functionRef = useRef(callback);

  // 如果callback改變，更新functionRef.current
  useEffect(() => {
    functionRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args) => {
      const now = Date.now();

      if (now - lastCallRef.current >= delay) {
        functionRef.current(...args);
        lastCallRef.current = now;
      }
    },
    [delay]
  );
}

