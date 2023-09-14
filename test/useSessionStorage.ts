import { renderHook, act } from "@testing-library/react";
import { useSessionStorage } from "../src"; // 請對應您的文件結構

// Step 1: 製作Mock sessionStorage 模擬 sessionStorage的行為，包括儲存和讀取
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(global, "sessionStorage", { value: mockSessionStorage });

describe("useSessionStorage custom hook", () => {
  // 清除模擬函數的調用信息
  afterEach(() => {
    (sessionStorage.getItem as jest.Mock).mockClear();
    (sessionStorage.setItem as jest.Mock).mockClear();
  });

  it("gets initial value from sessionStorage", () => {
    (sessionStorage.getItem as jest.Mock).mockReturnValueOnce('"someValue"');
    const { result } = renderHook(() => useSessionStorage("test-key", "default"));
    expect(sessionStorage.setItem).toHaveBeenCalledWith("test-key", '"default"');
    expect(result.current[0]).toBe("default");
  });

  it("sets value to sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage("test-key", "default"));

    act(() => {
      result.current[1]("newValue"); // 調用 setValue 函數
    });

    expect(sessionStorage.setItem).toHaveBeenCalledWith("test-key", '"newValue"');
  });

  // 更多測試用例...
});
