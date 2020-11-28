import { AxiosRequestConfig, AxiosResponse } from "../type";
import cookies from "@/public/utils/cookies";
import { getParamsCode } from "@/public/utils/getParamsCode";
import axios from "axios";
import errCode from "../data/errorCode";
import cache from "@/public/utils/cache";

const CancelToken = axios.CancelToken.source();

export function requestInterceptor(config: AxiosRequestConfig) {
  config.cancelToken = CancelToken.token;
  const token = cookies.get("token") || "";
  if (token === "" && config.isNeedLogin) {
    CancelToken.cancel();
    cache.clear();
    cookies.remove("token");
    window.location.href = `//${window.location.host}/admin/login?backUrl=${
      getParamsCode("backUrl")
        ? getParamsCode("backUrl")
        : encodeURIComponent(window.location.href)
    }`;
  }

  return config;
}

export function responseInterceptor(response: AxiosResponse) {
  if (
    response.data.statusCode === errCode.notLogin &&
    response.config.isNeedLogin
  ) {
    cookies.remove("token");
    cache.clear();
    window.location.href = `//${window.location.host}/admin/login?backUrl=${
      getParamsCode("backUrl")
        ? getParamsCode("backUrl")
        : encodeURIComponent(window.location.href)
    }`;
  }
  return response;
}
