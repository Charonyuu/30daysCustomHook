import { Method, AxiosRequestConfig } from "axios";
type UseFetchProps = {
    method?: Method;
    options?: AxiosRequestConfig;
};
export declare function useFetch<T>(url: string, { method, options }?: UseFetchProps): {
    data: T;
    loading: boolean;
    error: string;
};
export {};
