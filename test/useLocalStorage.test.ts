import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../src"; // 導入你的 useLocalStorage hook

// 模擬 LocalStorage
class LocalStorageMock {
  store: Record<string, string> = {};

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem<T>(key: string, value: T) {
    this.store[key] = JSON.stringify(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

describe("useLocalStorage", () => {
  let localStorageMock: LocalStorageMock;
  beforeAll(() => {
    localStorageMock = new LocalStorageMock();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("should retrieve the default value when local storage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test", "default"));

    expect(result.current[0]).toBe("default");
  });

  it("Initial state is a callback function", () => {
    const { result } = renderHook(() => useLocalStorage("key", () => "value"));

    expect(result.current[0]).toBe("value");
  });

  it("Initial state is an array", () => {
    const { result } = renderHook(() => useLocalStorage("digits", [1, 2]));

    expect(result.current[0]).toEqual([1, 2]);
  });

  it("should retrieve the stored value from local storage", () => {
    localStorageMock.setItem("test", "storedValue");
    const { result } = renderHook(() => useLocalStorage("test", "default"));

    expect(result.current[0]).toBe("storedValue");
  });

  it("should set a new value", () => {
    const { result } = renderHook(() => useLocalStorage("test", "default"));

    act(() => {
      result.current[1]("new_value");
    });
    expect(result.current[0]).toBe("new_value");
    expect(JSON.parse(localStorageMock.getItem("test")!)).toBe("new_value");
  });

  it("should handle functions as new value", () => {
    const { result } = renderHook(() => useLocalStorage("count", 1));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(JSON.parse(localStorageMock.getItem("count")!)).toBe("2");
  });

});
