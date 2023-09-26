import { renderHook, act } from "@testing-library/react";
import { useDebouncedCallback } from "../src"; // 請根據您的檔案結構進行調整

jest.useFakeTimers(); // 使用 Jest 的模擬定時器

describe("useDebouncedCallback hook", () => {

    //應該要到設定的時間才執行
  it("should call the callback function after the specified delay", () => {
    const callback = jest.fn(); // 創建一個模擬的回調函數
    const delay = 300; // 300ms 的延遲

    const { result } = renderHook(() => useDebouncedCallback(callback, delay));

    act(() => {
      result.current(); // 調用 debounced 函數
    });

    expect(callback).not.toHaveBeenCalled(); // 在延遲時間到達前，不應該調用回調函數

    act(() => {
      jest.advanceTimersByTime(delay); // 快進定時器來觸發回調
    });

    expect(callback).toHaveBeenCalled(); // 在延遲時間到達後，應該調用回調函數
  });

  // 測試重複調用
  it("should only call the callback after the last invocation within the delay", () => {
    const callback = jest.fn();
    const delay = 300;

    const { result } = renderHook(() => useDebouncedCallback(callback, delay));

    act(() => {
      result.current(); // 第一次調用
      jest.advanceTimersByTime(100); // 前進 100ms

      result.current(); // 在延遲時間內的第二次調用
    });

    expect(callback).not.toHaveBeenCalled(); // 延遲時間內不應該調用回調

    act(() => {
      jest.advanceTimersByTime(delay); // 前進到最後一次調用後的 300ms
    });

    expect(callback).toHaveBeenCalledTimes(1); // 最終應該只調用一次回調
  });

  // 測試參數傳遞
  it("should pass the correct arguments to the callback", () => {
    const callback = jest.fn();
    const delay = 300;

    const { result } = renderHook(() => useDebouncedCallback(callback, delay));

    act(() => {
      result.current("arg1", "arg2"); // 調用 debounced 函數並傳遞參數
      jest.advanceTimersByTime(delay); // 前進定時器觸發回調
    });

    expect(callback).toHaveBeenCalledWith("arg1", "arg2"); // 應該使用正確的參數調用回調
  });

  // 測試清理
  it("should clean up the timer when the component is unmounted", () => {
    const callback = jest.fn();
    const delay = 300;

    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, delay)
    );

    act(() => {
      result.current(); // 調用 debounced 函數
    });

    act(() => {
      unmount(); // 卸載組件
    });

    act(() => {
      jest.advanceTimersByTime(delay); // 前進定時器
    });

    expect(callback).not.toHaveBeenCalled(); // 卸載後不應該調用回調
  });
});
