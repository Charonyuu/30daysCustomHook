import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from "../src"; // 請確保這個路徑指向您的 useWindowSize Hook

describe("useWindowSize", () => {
  // 用於模擬窗口大小的物件
  let resizeWindow = (x: number, y: number) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event("resize"));
  };

  it("should return window size", () => {
    // 初始化窗口大小
    resizeWindow(800, 600);

    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  it("should update size when window is resized", () => {
    // 初始化窗口大小
    resizeWindow(800, 600);
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      // 改變窗口大小
      resizeWindow(1024, 768);
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });
});
