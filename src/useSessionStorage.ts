import { useState, useEffect, useCallback } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const readInitValue = useCallback(() => {
    try {
      const item = sessionStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      try {
        // 嘗試把item變成JSON解析
        return JSON.parse(item);
      } catch (e) {
        // 如果只是純字串則回傳
        return item;
      }
    } catch (err) {
      console.error("Error reading from sessionStorage:", err);
      return initialValue;
    }
  }, [key, initialValue]);
  const [storeState, setStoreState] = useState<T>();
  function setSessionStorage(value: T | ((prev: T) => T)) {
    try {
      const valueToStore =
        value instanceof Function ? value(storeState) : value;
      setStoreState(valueToStore);
      const valueToString = JSON.stringify(valueToStore);
      sessionStorage.setItem(key, valueToString);
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
