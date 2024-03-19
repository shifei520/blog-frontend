import request from '@/utils/request';
import type { NormalResponse } from '../types/common';
import type { Addtag, EditTag } from '../types/profile-index';

/** 新增标签 */
export const addTag = (data: Addtag): Promise<NormalResponse> => {
  return request({
    url: '/v1/tag',
    method: 'POST',
    data,
    headers: {
      requireToken: true,
    },
  });
};

/** 修改标签 */
export const editTag = (data: EditTag): Promise<NormalResponse> => {
  return request({
    url: '/v1/tag',
    method: 'PUT',
    data,
    headers: {
      requireToken: true,
    },
  });
};
