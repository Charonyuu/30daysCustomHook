import axios, { Method, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

type UseFetchProps = {
  method?: Method;
  options?: AxiosRequestConfig;
};

export function useFetch<T>(
  url: string,
  { method, options }: UseFetchProps = { method: "GET" }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function fetchApi() {
    try {
      setLoading(true);
      const res = await axios({ method, url, ...options });
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [url]);

  return { data, loading, error };
}
