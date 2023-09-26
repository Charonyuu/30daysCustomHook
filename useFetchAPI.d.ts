import { AxiosRequestConfig, Method } from "axios";
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
export declare function useFetchAPI<T>(url: string, { method, headers, options }?: UseFetchProps): UseFetchState<T>;
export {};
