import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readInitValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      console.log("item", typeof item);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storeState, setStoreState] = useState(readInitValue());
  function setLocalStorage(value: T | ((prev: T) => T)) {
    try {
      const valueToStore =
        value instanceof Function ? value(storeState) : value;
      setStoreState(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log("Set LocalStorage Error", error);
    }
  }

  useEffect(() => {
    setLocalStorage(readInitValue());
  }, []);

  return [storeState, setLocalStorage] as const;
}
