// admin API
import { AxiosRequestConfig } from "@/public/fetch/type.d.ts";
import * as Model from "@/model/api";
import { cryptoInstance, URL_DIC } from "@/public/fetch";

/**
 * @file admin apis
 * @description 注册
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchRegist = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<{}>>(URL_DIC.regist, params, config);

/**
 * @file admin apis
 * @description 登录
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchLogin = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<Model.UserInfo>>(
    URL_DIC.login,
    params,
    config
  );

/**
 * @file admin apis
 * @description 用户信息详情
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchGetUser = (params?: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<Model.UserInfo>>(URL_DIC.user, {
    params,
    ...config
  });

/**
 * @file admin apis
 * @description 分类列表(分页)
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchGetCategoryList = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.get<ApiResponse<{ total: number; list: Category[] }>>(
    URL_DIC.category,
    { params, isNeedLogin: true, ...config }
  );

/**
 * @file admin apis
 * @description 获取所有分类
 * @author WeirShi
 * @date 2010-11-01
 */

export const FetchGetAllCategory = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<Category[]>>(URL_DIC.allCategory, {
    params,
    isNeedLogin: true,
    ...config
  });

/**
 * @file admin apis
 * @description 新增分类
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchAddCategory = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<{}>>(URL_DIC.category, params, {
    isNeedLogin: true,
    ...config
  });

/**
 * @file admin apis
 * @description 更新分类
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchUpdateCategory = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.category, params, {
    isNeedLogin: true,
    ...config
  });

/**
 * @file admin apis
 * @description 删除分类
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchDeleteCategory = (params: any) =>
  cryptoInstance.delete(URL_DIC.category, { params, isNeedLogin: true });

/**
 * @file admin apis
 * @description 标签列表(分页)
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchGetTagList = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<{ total: number; list: Tag[] }>>(URL_DIC.tag, {
    params,
    isNeedLogin: true,
    ...config
  });

/**
 * @file admin apis
 * @description 获取所有标签
 * @author WeirShi
 * @date 2010-11-01
 */

export const FetchGetAllTag = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<Tag[]>>(URL_DIC.allTag, {
    params,
    isNeedLogin: true,
    ...config
  });

/**
 * @file admin apis
 * @description 新增标签
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchAddTag = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<{}>>(URL_DIC.tag, params, {
    isNeedLogin: true,
    ...config
  });

/**
 * @file admin apis
 * @description 更新标签
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchUpdateTag = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.tag, params, {
    isNeedLogin: true,
    ...config
  });

/**
 * @file admin apis
 * @description 删除标签
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchDeleteTag = (params: any) =>
  cryptoInstance.delete(URL_DIC.tag, { params, isNeedLogin: true });

/**
 * @file admin apis
 * @description 文章列表(分页)
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchGetArticleList = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.get<ApiResponse<{ total: number; list: Article[] }>>(
    URL_DIC.article,
    {
      params,
      isNeedLogin: true,
      ...config
    }
  );

/**
 * @file admin apis
 * @description 新增文章
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchAddArticle = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.post<ApiResponse<{}>>(URL_DIC.article, params, {
    ...config,
    isNeedLogin: true
  });

/**
 * @file admin apis
 * @description 更新文章
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchUpdateArticle = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.article, params, {
    ...config,
    isNeedLogin: true
  });

/**
 * @file admin apis
 * @description 删除文章
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchDeleteArticle = (params: any) =>
  cryptoInstance.delete(URL_DIC.article, { params, isNeedLogin: true });

/**
 * @file admin apis
 * @description 文章详情
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchGetArticleDetail = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.get<ApiResponse<Article>>(URL_DIC.articleDetail, {
    params,
    isNeedLogin: true,
    ...config
  });

/**
 * @file admin apis
 * @description 移动文章到列表
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchMoveArticleToList = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.articleToList, params, {
    ...config,
    isNeedLogin: true
  });

/**
 * @file admin apis
 * @description 移动文章到草稿箱
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchMoveArticleToDrafts = (
  params: any,
  config?: AxiosRequestConfig
) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.articleToDrafts, params, {
    ...config,
    isNeedLogin: true
  });

/**
 * @file admin apis
 * @description 发布，取消发布文章
 * @author WeirShi
 * @date 2010-11-01
 */
export const FetchPublishArticle = (params: any, config?: AxiosRequestConfig) =>
  cryptoInstance.put<ApiResponse<{}>>(URL_DIC.publishArticle, params, {
    ...config,
    isNeedLogin: true
  });
