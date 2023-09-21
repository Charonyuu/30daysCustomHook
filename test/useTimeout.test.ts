import { renderHook, act } from "@testing-library/react";
import { useTimeout } from "../src"; // 請確保這個路徑指向你的 useTimeout 檔案

jest.useFakeTimers();

describe("useTimeout", () => {
  it("should execute callback after given delay", () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toBeCalled();

    act(() => {
      jest.runAllTimers();
    });

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not execute callback if delay is null", () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, null));

    act(() => {
      jest.runAllTimers();
    });

    expect(callback).not.toBeCalled();
  });

  it("should clear timeout when unmounted", () => {
    const callback = jest.fn();

    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    act(() => {
      unmount();
      jest.runAllTimers();
    });

    expect(callback).not.toBeCalled();
  });
});
