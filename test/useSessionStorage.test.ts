import { renderHook, act } from "@testing-library/react";
import { useSessionStorage } from "../src"; // 請對應您的文件結構

// Step 1: 製作Mock sessionStorage 模擬 sessionStorage的行為
// `getItem`: 用于模拟从 sessionStorage 中读取数据的行为。
// `setItem`: 用于模拟向 sessionStorage 中写入数据的行为。
// `clear`: 用于模拟清空 sessionStorage 的行为。
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

  // 測試一開始sessionStorage就有初始值
  it("gets initial value from sessionStorage", () => {
    (sessionStorage.getItem as jest.Mock).mockReturnValueOnce('"someValue"');
    const { result } = renderHook(() => useSessionStorage("key", "default"));

    expect(result.current[0]).toBe("someValue");
  });

  //測試確保可以設置值進去
  it("sets value to sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage("key", "default"));

    act(() => {
      result.current[1]("newValue"); // 調用 setValue 函數
    });

    expect(sessionStorage.setItem).toHaveBeenCalledWith("key", '"newValue"');
  });

  //測試確保如果 sessionStorage 中的值不是一個 JSON 字串，hook 依然能夠正確地讀取它。
  it("should handle non-JSON values gracefully", () => {
    mockSessionStorage.getItem.mockReturnValueOnce("non-json-value");
    const { result } = renderHook(() => useSessionStorage("key", "default"));
    expect(result.current[0]).toBe("non-json-value");
  });

  // 測試確保即使 sessionStorage 拋出一個錯誤（比如由於存儲已滿或其他原因），hook 還是能夠正確地設置初始值
  it("should handle errors thrown by sessionStorage gracefully", () => {
    mockSessionStorage.getItem.mockImplementationOnce(() => {
      throw new Error("Some error");
    });
    const { result } = renderHook(() => useSessionStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  // 測試確保在 sessionStorage 為空（或者指定的 key 不存在）的情況下，hook 能正確地設置初始值
  it("should set initial value if sessionStorage is empty", () => {
    mockSessionStorage.getItem.mockReturnValueOnce(null);
    const { result } = renderHook(() => useSessionStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  // 測試確保如果你傳入一個函數來更新存儲的值，這個函數能正確地接收到舊值作為參數，並正確地更新新值
  it("should handle function updater correctly", () => {
    const { result } = renderHook(() => useSessionStorage("key", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      "key",
      JSON.stringify(1)
    );
  });
  // 更多測試用例...
});
