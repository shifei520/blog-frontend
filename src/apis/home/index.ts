import request from '@/utils/request';
import type { NormalResponse } from '../types/common';

/** 统计网站的访问数和文章数 */
export const statisticsBlog = (): Promise<NormalResponse> => {
  return request({
    url: '/v1/statistics/info',
    method: 'GET',
  });
};
