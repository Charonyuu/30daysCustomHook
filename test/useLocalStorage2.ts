import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../src"; // 請對應您的文件結構

// Step 1: 製作Mock localStorage 模擬 localStorage的行為，包括儲存和讀取
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(global, "localStorage", { value: mockLocalStorage });

describe("useLocalStorage custom hook", () => {
  // 清除模擬函數的調用信息
  afterEach(() => {
    (localStorage.getItem as jest.Mock).mockClear();
    (localStorage.setItem as jest.Mock).mockClear();
  });

  it("gets initial value from localStorage", () => {
    (localStorage.getItem as jest.Mock).mockReturnValueOnce('"someValue"');
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(localStorage.setItem).toHaveBeenCalledWith("test-key", '"default"');
    expect(result.current[0]).toBe("default");
  });

  it("sets value to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    act(() => {
      result.current[1]("newValue"); // 調用 setValue 函數
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("test-key", '"newValue"');
  });

  // 更多測試用例...
});
