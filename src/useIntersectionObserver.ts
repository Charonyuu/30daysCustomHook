import { RefObject, useEffect, useState, useRef } from "react";

export function useIntersectionObserver(
  target: RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    )
  );

  useEffect(() => {
    const currentObserver = observer.current;
    const currentTarget = target.current;

    if (currentTarget) {
      currentObserver.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        currentObserver.unobserve(currentTarget);
      }
    };
  }, [target]);

  return isIntersecting;
}

