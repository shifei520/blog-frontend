export interface TravelCityItem {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
}

export interface TravelSceneItem {
  id: number;
  name: string;
  description: null | string;
  coverImage: string;
  createTime: string;
  updateTime: string;
}

export interface TravelImageItem {
  id: number;
  url: string;
}

export interface ImageListGetParams {
  sceneId: number;
  pageNo: number;
  pageSize: number;
}
