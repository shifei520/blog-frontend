import request from '@/utils/request';
import type { NormalResponse, PageResponse } from '../types/common';
import type {
  TravelCityItem,
  TravelSceneItem,
  ImageListGetParams,
  TravelImageItem,
} from '../types/travel';

/** 获取城市列表 */
export const travelCityGet = (): Promise<NormalResponse<TravelCityItem[]>> => {
  return request({
    url: '/v1/travel/city',
    method: 'GET',
  });
};

/** 获取城市下景点列表 */
export const travelSceneByCityId = (params: {
  cityId: number;
}): Promise<NormalResponse<TravelSceneItem[]>> => {
  return request({
    url: '/v1/travel/scene',
    method: 'GET',
    params,
  });
};

/** 获取景点下的图片列表 */
export const imageBySceneId = (
  params: ImageListGetParams,
): Promise<PageResponse<TravelImageItem>> => {
  return request({
    url: '/v1/travel/photo',
    method: 'GET',
    params,
  });
};
