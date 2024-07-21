import axios from 'axios';
import type { AxiosProgressEvent } from 'axios';
import request from '@/utils/request';
import type { NormalResponse } from '../types/common';
import type { Addtag, EditTag } from '../types/profile-index';
import { userStore } from '@/store/user';
import { getExt } from '@/utils/utils';

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

/** 上传头像 */
export const uploadAvator = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
): Promise<string> => {
  const data = await request({
    url: '/v1/upload/presignedAvatorUrl',
    method: 'GET',
    params: {
      name: file.name,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      requireToken: true,
    },
  });

  await axios({
    url: data.data,
    method: 'PUT',
    data: file,
    onUploadProgress,
  });

  const store = userStore();
  return `/avator/${store.userInfo?.id}.${getExt(file.name)}`;
};
