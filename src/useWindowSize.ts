import { useState, useEffect } from "react";

export function useWindowSize() {
  const isClient = typeof window === "object";

  const [width, setWidth] = useState<number>(isClient ? window.innerWidth : 0);
  const [height, setHeight] = useState<number>(
    isClient ? window.innerHeight : 0
  );

  useEffect(() => {
    if (!isClient) return;
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return { height, width };
}
