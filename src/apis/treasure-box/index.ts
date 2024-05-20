import request from '@/utils/request';
import type { NormalResponse, PageResponse } from '../types/common';
import type {
  MenuItem,
  TagParamsGet,
  TagItem,
  ProjectAddparams,
  ProjectParamsGet,
  ProjectItem,
} from '../types/treasure';

/** 获取所有的菜单列表 */
export const menuListGet = (): Promise<NormalResponse<MenuItem[]>> => {
  return request({
    url: '/v1/treasure-box/menu',
    method: 'GET',
  });
};

/** 获取所有的标签列表 */
export const tagListGet = (params: TagParamsGet): Promise<PageResponse<TagItem>> => {
  return request({
    url: '/v1/treasure-box/tag',
    method: 'GET',
    params,
  });
};

/** 推荐项目 */
export const recommedProject = (data: ProjectAddparams): Promise<NormalResponse> => {
  return request({
    url: '/v1/treasure-box/project',
    method: 'POST',
    data,
  });
};

/** 获取项目列表 */
export const projectListGet = (params: ProjectParamsGet): Promise<PageResponse<ProjectItem>> => {
  return request({
    url: '/v1/treasure-box/front/project',
    method: 'GET',
    params,
  });
};
