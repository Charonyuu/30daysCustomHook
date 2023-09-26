import { act, renderHook } from "@testing-library/react";

import { useCopyToClipboard } from "../src";

describe("useClipboard()", () => {
  const originalClipboard = { ...global.navigator.clipboard };
  const mockData = "Test value";

  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    // @ts-ignore mock clipboard
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    jest.resetAllMocks();
    // @ts-ignore mock clipboard
    global.navigator.clipboard = originalClipboard;
  });

  test("should use clipboard", () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current[0]).toBe(false);
    expect(typeof result.current[1]).toBe("function");
  });

  test("should copy to clipboard using execCommand for unsupported browsers", () => {
    // Mocking execCommand
    document.execCommand = jest.fn();
    // Mocking navigator.clipboard to be undefined
    // @ts-ignore
    global.navigator.clipboard = undefined;

    // Mock console.warn
    const consoleWarnSpy = jest.spyOn(console, "warn");
    consoleWarnSpy.mockImplementation(() => {});

    const { result } = renderHook(() => useCopyToClipboard());
    act(() => {
      result.current[1](mockData);
    });

    expect(document.execCommand).toHaveBeenCalledWith("copy"); // 應該調用了 document.execCommand
    expect(result.current[0]).toBe(true); // isCopied 應該是 true

    // 確保警告被打印出來
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Clipboard API not supported, falling back to execCommand"
    );

    // 還原 console.warn
    consoleWarnSpy.mockRestore();
  });

  
  test("should use navigator.clipboard copy to the clipboard and copy state become true", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current[1](mockData);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData);
    expect(result.current[0]).toBe(true);
  });

  test("should set isCopied back to false after 3 seconds", async () => {
    jest.useFakeTimers(); // 使用 Jest 的 fake timers
    const { result } = renderHook(() => useCopyToClipboard());

    // 初始化為 true
    await act(async () => {
      await result.current[1](mockData);
    });

    expect(result.current[0]).toBe(true); // 確保 state 被設置為 true

    act(() => {
      jest.advanceTimersByTime(3000); // 跳過 3 秒
    });

    expect(result.current[0]).toBe(false); // 檢查 state 是否被重置為 false

    jest.useRealTimers(); // 清理 timers
  });
  test("should set isCopied to false on error", async () => {
    // Mock console.error
    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});

    const error = new Error("Failed to copy text");
    // Mocking writeText to throw an error
    global.navigator.clipboard.writeText = jest.fn(() => Promise.reject(error));

    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      await result.current[1](mockData);
    });

    expect(result.current[0]).toBe(false); // isCopied 應該是 false
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to copy text: ",
      error
    ); // 確保正確的錯誤被輸出

    consoleErrorSpy.mockRestore(); // 還原 console.error
  });
});
