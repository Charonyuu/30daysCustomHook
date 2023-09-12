import { useState, useEffect, useCallback } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const readInitValue = useCallback(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storeState, setStoreState] = useState(readInitValue());
  function setSessionStorage(value: T | ((prev: T) => T)) {
    try {
      const valueToStore =
        value instanceof Function ? value(storeState) : value;
      setStoreState(valueToStore);
      sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log("Set sessionStorage Error", error);
    }
  }

  useEffect(() => {
    setSessionStorage(readInitValue());
  }, []);

  return [storeState, setSessionStorage] as const;
}
