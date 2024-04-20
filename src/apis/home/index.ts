import request from '@/utils/request';
import type { NormalResponse } from '../types/common';
import type { PoetryItem } from '../types/home';

/** 统计网站的访问数和文章数 */
export const statisticsBlog = (): Promise<NormalResponse> => {
  return request({
    url: '/v1/statistics/info',
    method: 'GET',
  });
};

/** 获取首页诗词详情 */
export const poetryDetail = (): Promise<NormalResponse<PoetryItem>> => {
  return request({
    url: '/v1/poetry/recommend',
    method: 'GET',
  });
};
