import { useState, useEffect, useCallback } from "react";
export function useLocalStorage<T>(key: string, initialValue: T) {
  const readInitValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
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
      console.error("Error reading from localStorage:", err);
      return initialValue;
    }
  }, [key, initialValue]);
  const [storeState, setStoreState] = useState(readInitValue());
  function setLocalStorage(value: T | ((prev: T) => T)) {
    try {
      const valueToStore =
        value instanceof Function ? value(storeState) : value;
      setStoreState(valueToStore);
      // const valueToString = JSON.stringify(valueToStore);
      // localStorage.setItem(key, valueToString);
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
