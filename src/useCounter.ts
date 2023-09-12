import React, { useState } from "react";

export function useCounter(initialValue?: number) {
  const [count, setCount] = useState(initialValue || 0);

  // Increase 1
  function increment() {
    setCount((prevCount: number) => prevCount + 1);
  }

  // decrease 1
  function decrement() {
    setCount((prevCount: number) => prevCount - 1);
  }

  // reset to initValue or 0
  function reset() {
    setCount(initialValue || 0);
  }

  return { count, setCount, increment, decrement, reset };
}
