import { renderHook, act } from "@testing-library/react";
import { useRef } from "react";
import { useIntersectionObserver } from "../src";

describe('useIntersectionObserver', () => {
  let observe: jest.Mock;
  let unobserve: jest.Mock;
  let disconnect: jest.Mock;

  beforeEach(() => {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();

    // @ts-ignore
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      disconnect,
    }));
  });

  it('should observe the target element on mount', () => {
    const { result } = renderHook(() => {
      const ref = { current: document.createElement('div') };
      const isIntersecting = useIntersectionObserver(ref);

      return { ref, isIntersecting };
    });

    expect(observe).toHaveBeenCalledWith(result.current.ref.current);
  });

  it('should unobserve the target element on unmount', () => {
    const { result, unmount } = renderHook(() => {
      const ref = { current: document.createElement('div') };
      const isIntersecting = useIntersectionObserver(ref);

      return { ref, isIntersecting };
    });

    act(() => {
      unmount();
    });

    expect(unobserve).toHaveBeenCalledWith(result.current.ref.current);
  });
});
