import cookies from "@/public/utils/cookies";
import { AxiosRequestConfig } from "../type";
/**
 * 请求参数拦截器
 *
 */
export function requestInterceptor(config: AxiosRequestConfig) {
  // 这里可以对request进行一些自定义配置
  const token: string = cookies.get("token") || "";
  if (token) {
    config.headers["authorization"] = window.atob(token);
  }
  //  文件上传
  if (config.isUpload) {
    const { file, ...p } = config.data;
    const form = new FormData();
    Object.keys(p).forEach(m => {
      form.append(`${m}`, p[m]);
    });
    form.append("file", file);
    config.headers["Content-Type"] = "multipart/form-data";
    config.data = form;
  }

  return config;
}
