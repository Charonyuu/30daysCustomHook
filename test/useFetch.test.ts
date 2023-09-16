import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { useFetch } from "../src"; // 請根據你的目錄結構調整這個 import 路徑

describe("useFetch", () => {
  const mock = new MockAdapter(axios);
  let errorSpy: jest.SpyInstance;

  beforeAll(() => {
    // 在所有測試運行之前，偽裝 console.error
    errorSpy = jest.spyOn(console, "error");
    errorSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    // 在所有測試運行完畢後，還原 console.error 的原始實現
    errorSpy.mockRestore();
  });
  // 每次測試完成後重置 mock
  afterEach(() => {
    mock.reset();
  });

  // 測試成功狀態
  it("成功取得資料", async () => {
    const mockData = { foo: "bar" };

    // 當 GET /api/test 被呼叫時，回傳 mockData
    mock.onGet("/api/test").reply(200, mockData);

    // 執行 hook
    const { result } = renderHook(() => useFetch("/api/test"));

    // 初始狀態應為 loading
    expect(result.current.loading).toBe(true);

    // 等待異步操作完成
    await waitFor(() => {
      // 驗證結果
      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("");
    });
  });

  // 測試錯誤狀態
  it("取得資料失敗", async () => {
    // 回傳 500 錯誤
    mock.onGet("/api/test").reply(500);

    const { result } = renderHook(() => useFetch("/api/test"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      // 驗證結果
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).not.toBe("");
    });
  });
});
