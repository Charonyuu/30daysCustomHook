import { useCounter } from "../src";
import { renderHook, act } from "@testing-library/react";

// describe 用於對一組相關的測試用例進行分組
// 它接受兩個參數：
// 字串（描述該測試組的目的或主題）。
// 一個包含一組測試用例的回調函數。
describe("useCounter custom hook", () => {
  // 測試放在這裡面

  // it 用於定義單一的測試用例, 參數與describe一樣
  // 1. 使用renderHook 來測試我們剛剛做的useCounter
  // 測試如果沒有填入初始值，count預設會是0
  it("should use default initial value", () => {
    // 1. 使用renderHook 來測試我們剛剛做的useCounter
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  // 測試如果有填入初始值，count預設會是初始值
  it("should use initial value", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  // 測試是否有加一
  it("should increment counter", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(6);
  });

  // 測試是否有減一
  it("should decrement counter", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it("should reset counter to initial value", () => {
    // renderHook接受兩個參數
    // 1.測試的 Hook 函數（必須）：**這是你想要測試的實際 hook 函數或一個封裝該 hook 的函數。這個函數的返回值會被包裝在 result 對象中，以便後續進行檢查。
    // 2.選項對象（可選）：**一個包含各種選項的對象。其中最常用的選項可能是 initialProps，這個選項允許你為你的 hook 提供初始的 props

    const { result, rerender } = renderHook((props) => useCounter(props), {
      initialProps: 5,
    });

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(6);

    rerender(10);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
