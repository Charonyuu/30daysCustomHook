import React, { useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  callback: () => void
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback]); // updated dependency array to include callback instead of ref

  return ref as any;
};
