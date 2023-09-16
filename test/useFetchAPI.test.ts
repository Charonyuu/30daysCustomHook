import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { useFetchAPI } from "../src"; // 請根據你的目錄結構調整這個 import 路徑

describe("useFetch", () => {
  const mock = new MockAdapter(axios);
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
    const { result } = renderHook(() => useFetchAPI("/api/test"));

    // 初始狀態應為 loading
    expect(result.current.loading).toBe(true);

    // 等待異步操作完成
    await waitFor(() => {
      // 驗證結果
      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  // 測試錯誤狀態
  it("取得資料失敗", async () => {
    // 回傳 500 錯誤
    mock.onGet("/api/test2").reply(500);

    const { result } = renderHook(() => useFetchAPI("/api/test2"));

    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      // 驗證結果
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).not.toBeNull();
    });
  });

  it("can perform POST requests", async () => {
    const url = "http://example.com/data";
    const postData = { key: "value" };
    mock.onPost(url, postData).reply(201);

    const { result } = renderHook(() =>
      useFetchAPI(url, { method: "POST", options: { data: postData } })
    );

    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });
  });

  // 測試 headers
  it("can send custom headers", async () => {
    const url = "http://example.com/data";
    const headers = { Authorization: "Bearer token" };
    mock.onGet(url, headers).reply(200);

    const { result } = renderHook(() => useFetchAPI(url, { headers }));

    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });
  });

  // 測試取消請求
  it("can abort a request", async () => {
    const url = "http://example.com/data";
    mock.onGet(url).reply(() => {
      return new Promise((_, reject) => {
        reject;
      });
    });

    const { result, unmount } = renderHook(() => useFetchAPI(url));
    unmount(); // 在請求完成前取消組件

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(true); // 仍然在加載
      expect(result.current.error).toBe(null); // 沒有錯誤，因為我們自己取消了請求
    });
  });

  // 測試緩存
  it("can cache requests", async () => {
    const url = "http://example.com/data";
    const responseData = { data: "some data" };
    mock.onGet(url).replyOnce(200, responseData); // 注意：使用 replyOnce，模擬只回覆一次

    // 第一次請求
    const { result, rerender } = renderHook(() => useFetchAPI(url));
    expect(result.current.loading).toBeTruthy();
    await waitFor(() => {
      expect(result.current.data).toEqual(responseData);
    });

    // 觸發第二次請求
    rerender();
    expect(result.current.data).toEqual(responseData); // 應該使用緩存的數據，而不是重新請求
  });
});
