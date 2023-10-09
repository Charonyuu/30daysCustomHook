import { renderHook, act } from "@testing-library/react";
import { useInterval } from "../src";

jest.useFakeTimers();

describe("useInterval", () => {
  it("calls the callback after a given delay", () => {
    const callback = jest.fn();
    const delay = 1000;

    renderHook(() => useInterval(callback, delay));

    // Fast-forward until all timers have been executed
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("does not call the callback if delay is null", () => {
    const callback = jest.fn();

    renderHook(() => useInterval(callback, null));

    act(() => {
      jest.advanceTimersByTime(1000); // 1s for example
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("clears the previous interval and restarts with a new delay", () => {
    const callback = jest.fn();

    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      { initialProps: { delay: 1000 } }
    );

    act(() => {
      jest.advanceTimersByTime(1000); // 1s for the initial delay
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // Now, change the delay
    rerender({ delay: 5000 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1); // Not called again after 1s, due to the new delay

    act(() => {
      jest.advanceTimersByTime(4000); // 5s total since rerender
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
