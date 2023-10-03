import { renderHook, act } from "@testing-library/react";
import { useThrottle } from "../src"; // adjust the import to your file structure

jest.useFakeTimers();

test("should not call the callback more frequently than the delay", () => {
  const callback = jest.fn();
  const delay = 1000;
  const { result } = renderHook(() => useThrottle(callback, delay));

  // Call the throttled function multiple times
  act(() => {
    result.current();
    result.current();
    result.current();
  });

  expect(callback).toHaveBeenCalledTimes(1); // Only the first call should have gone through

  // Fast-forward time to just before the delay
  act(() => {
    jest.advanceTimersByTime(999);
  });

  // Call again
  act(() => {
    result.current();
  });

  expect(callback).toHaveBeenCalledTimes(1); // Still should not have been called a second time

  // Fast-forward time to the delay
  act(() => {
    jest.advanceTimersByTime(1);
  });

  // Call again
  act(() => {
    result.current();
  });

  expect(callback).toHaveBeenCalledTimes(2); // Now it should have been called a second time
});
