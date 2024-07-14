import request from '@/utils/request';
import type { NormalResponse } from '../types/common';
import type { bookItem } from '../types/book';

/** 获取书籍列表 */
export const bookListGet = (): Promise<NormalResponse<bookItem[]>> => {
  return request({
    url: '/v1/book',
    method: 'GET',
  });
};
