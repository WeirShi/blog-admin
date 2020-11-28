const baseUrl = `${process.env.REACT_APP_API_URL}`;

const urlDictionary: Dictionary<string> = {
  login: `${baseUrl}/login`, // 登录
  regist: `${baseUrl}/regist`, // 注册
  user: `${baseUrl}/user`, // 用户
  category: `${baseUrl}/category`, // 分类
  allCategory: `${baseUrl}/category/all`, // 所有分类
  tag: `${baseUrl}/tag`, // 标签
  allTag: `${baseUrl}/tag/all`, // 所有标签
  article: `${baseUrl}/article`, // 文章
  articleDetail: `${baseUrl}/article/detail`, // 文章详情
  articleToList: `${baseUrl}/article/list`, // 移动文章到列表
  publishArticle: `${baseUrl}/article/publish`, // 移动文章到列表
  articleToDrafts: `${baseUrl}/article/drafts` // 移动文章到草稿箱
};

export default urlDictionary;
