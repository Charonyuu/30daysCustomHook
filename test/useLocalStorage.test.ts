import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../src"; // 導入你的 useLocalStorage hook

// 模擬 LocalStorage
class LocalStorageMock {
  store: Record<string, string> = {};

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem<T>(key: string, value: T) {
    this.store[key] = value as unknown as string;
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
  beforeEach(() => {
    localStorageMock.clear();
  });
  beforeAll(() => {
    localStorageMock = new LocalStorageMock();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

//   it("should retrieve the default value when local storage is empty", () => {
//     const { result } = renderHook(() => useLocalStorage("test", "default"));

//     expect(result.current[0]).toBe("default");
//   });

  it("should retrieve the stored value from local storage", () => {
    localStorageMock.setItem("test", "storedValue");
    console.log(localStorageMock);
    
    console.log(localStorageMock.getItem("test"));
    const { result } = renderHook(() => useLocalStorage("test", "default"));
    console.log(localStorageMock);

    expect(result.current[0]).toBe("storedValue");
  });

//   it("should set a new value", () => {
//     const { result } = renderHook(() => useLocalStorage("test", "default"));

//     act(() => {
//       result.current[1]("new_value");
//     });
//     expect(result.current[0]).toBe("new_value");
//     expect(JSON.parse(localStorageMock.getItem("test")!)).toBe("new_value");
//   });

//   it("should handle functions as new value", () => {
//     const { result } = renderHook(() => useLocalStorage("test", "default"));

//     act(() => {
//       result.current[1]((prev) => prev + "_updated");
//     });

//     expect(result.current[0]).toBe("default_updated");
//     expect(JSON.parse(localStorageMock.getItem("test")!)).toBe(
//       "default_updated"
//     );
//   });
});
