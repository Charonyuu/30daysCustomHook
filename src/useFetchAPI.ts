import axios, { AxiosRequestConfig, Method } from "axios";
import { useEffect, useState, useRef } from "react";

// 用來儲存緩存的數據
const cache: Record<string, any> = {};

type UseFetchProps = {
  method?: Method;
  headers?: Record<string, string>;
  options?: AxiosRequestConfig;
};

type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: {
    message: string;
    code?: number;
  } | null;
};

export function useFetchAPI<T>(
  url: string,
  { method, headers, options }: UseFetchProps = { method: "GET" }
): UseFetchState<T> {
  const cacheKey = useRef(`${method}-${url}-${JSON.stringify(options)}`);
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    // 檢查緩存
    if (cache[cacheKey.current]) {
      setState({
        data: cache[cacheKey.current],
        loading: false,
        error: null,
      });
      return;
    }

    // 發出新請求
    const fetchData = async () => {
      try {
        const res = await axios({
          method,
          url,
          headers,
          signal: controller.signal,
          ...options,
        });

        // 更新緩存
        cache[cacheKey.current] = res.data;

        setState({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: {
            message: error.message,
            code: error.response?.status,
          },
        });
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, method, headers, options]);

  return state;
}
