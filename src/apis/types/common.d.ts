export interface PageResponse<T = any> {
  code: number;
  message: string;
  data: {
    totalCount: number;
    list: T[];
  };
}

export interface NormalResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
