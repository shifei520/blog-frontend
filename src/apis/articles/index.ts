import request from '@/utils/request';
import type { AxiosProgressEvent } from 'axios';
import type { NormalResponse, PageResponse } from '../types/common';
import type {
  ArticleListGetParams,
  ArticleItem,
  CategoryItem,
  TagItem,
  ArticleAddParams,
  ArticleStatisticsItem,
  ArticleListSearchParams,
  ArticleSearchItem,
} from '../types/articles-index.d';

/** 获取文章列表 */
export const articleListGet = (
  params: ArticleListGetParams,
): Promise<PageResponse<ArticleItem>> => {
  return request({
    url: '/v1/article/list',
    method: 'GET',
    params,
  });
};

/** 获取文章归档列表 */
export const documentedArticleListGet = (params: {
  pageNo: number;
  pageSize: number;
}): Promise<PageResponse<ArticleItem>> => {
  return request({
    url: '/v1/article/timelist',
    method: 'GET',
    params,
  });
};

/** 获取所有分类 */
export const categoryListGet = (): Promise<NormalResponse<CategoryItem[]>> => {
  return request({
    url: '/v1/category/list',
    method: 'GET',
  });
};

/** 获取所有的标签列表 */
export const tagListGet = (): Promise<NormalResponse<TagItem[]>> => {
  return request({
    url: '/v1/tag/all',
    method: 'GET',
  });
};

/** 上传封面 */
export const uploadCoverImg = (
  data: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
): Promise<NormalResponse<string>> => {
  return request({
    url: '/v1/upload/img',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      requireToken: true,
    },
    onUploadProgress,
  });
};

/** 添加文章 */
export const articleAdd = (data: ArticleAddParams): Promise<NormalResponse> => {
  return request({
    url: '/v1/article/add',
    method: 'POST',
    data,
    headers: {
      requireToken: true,
    },
  });
};

/** 获取文章详情 */
export const detailArticleById = (id: number): Promise<NormalResponse<ArticleItem>> => {
  return request({
    url: '/v1/article/detail/' + id,
    method: 'GET',
  });
};

/** 增加文章浏览量 */
export const addView = (articleId: number): Promise<NormalResponse> => {
  return request({
    url: '/v1/article/view',
    method: 'GET',
    params: {
      articleId,
    },
  });
};

/** 判断用户是否已经点赞 */
export const isLikedGet = (articleId: number): Promise<NormalResponse> => {
  return request({
    url: '/v1/article/isLiked',
    method: 'GET',
    params: {
      articleId,
    },
    headers: {
      requireToken: true,
    },
  });
};

/** 获取文章推荐列表 */
export const recommendArticleList = (): Promise<NormalResponse<ArticleItem[]>> => {
  return request({
    url: '/v1/article/recommend',
    method: 'GET',
  });
};

/** 获取文章统计列表 */
export const statisticsArticleList = (): Promise<NormalResponse<ArticleStatisticsItem[]>> => {
  return request({
    url: '/v1/article/statistics',
    method: 'GET',
  });
};

/** 获取文章搜索列表 */
export const articleListSearch = (
  params: ArticleListSearchParams,
): Promise<PageResponse<ArticleSearchItem>> => {
  return request({
    url: '/v1/article/esList',
    method: 'GET',
    params,
  });
};
