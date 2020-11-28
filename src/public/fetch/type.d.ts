/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  AxiosRequestConfig as _AxiosRequestConfig,
  AxiosResponse as _AxiosResponse,
  AxiosPromise,
  AxiosInterceptorManager,
  AxiosError as _AxiosError
} from "axios";

export interface AxiosError extends _AxiosError {}

export interface AxiosRequestConfig extends _AxiosRequestConfig {
  isNotLoading?: boolean;
  isNeedLogin?: boolean;
  isUpload?: boolean;
}

export interface AxiosResponse extends _AxiosResponse {
  config: AxiosRequestConfig;
}

export interface AxiosDataPromise<T = any> extends Promise<T> {}

export interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request<T = any>(config: AxiosRequestConfig): AxiosDataPromise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosDataPromise<T>;
  delete(url: string, config?: AxiosRequestConfig): AxiosDataPromise;
  head(url: string, config?: AxiosRequestConfig): AxiosDataPromise;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosDataPromise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosDataPromise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosDataPromise<T>;
}
