import { renderHook, act, waitFor } from "@testing-library/react";
import axios from "axios";
import { useUploadProgress } from "../src"; // 替換成你的hook的正確路徑

// Mocking axios post method
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useUploadProgress hook", () => {
  it("should handle the upload progress", async () => {
    // 創建一個 File 來模擬 File 對象
    const file = new File(["file content"], "filename.txt", {
      type: "text/plain",
    });

    // 設定 axios.post 的 mock 實現
    mockedAxios.post.mockResolvedValue({ data: "success" });

    const { result } = renderHook(() => useUploadProgress());

    act(() => {
      // 呼叫 uploadFile 方法
      result.current.uploadFile(file);
    });

    await waitFor(() => {
      expect(result.current.progress).toBe(100);
    });

    // 檢查 progress 是否更新為期望的值
  });

  it("should reset progress on error", async () => {
    const file = new File(["file content"], "filename.txt", {
      type: "text/plain",
    });

      const consoleErrorSpy = jest.spyOn(console, "error");
      consoleErrorSpy.mockImplementation(() => {});
    // 設定 axios.post 的 mock 實現來拋出錯誤
    mockedAxios.post.mockRejectedValue(new Error("Error uploading file"));

    const { result } = renderHook(() => useUploadProgress());

    act(() => {
      result.current.uploadFile(file);
    });

    await waitFor(() => {
      expect(result.current.progress).toBe(0);
       expect(consoleErrorSpy).toHaveBeenCalledWith(
         "Error uploading file:",
         "Error: Error uploading file"
       );
    });
  });
});
