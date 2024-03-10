import request from '@/utils/request';
import type { RegisterParams, UserInfoPut } from '../types/login';
import type { NormalResponse } from '../types/common';

/** 发送验证码 */
export const getCaptcha = (address: string): Promise<NormalResponse> => {
  return request({
    url: '/v1/user/captcha',
    method: 'GET',
    params: {
      address,
    },
  });
};

/** 游客注册 */
export const touristRegister = (data: RegisterParams): Promise<NormalResponse> => {
  return request({
    url: '/v1/user/register',
    method: 'POST',
    data,
  });
};

/** 登陆 */
export const login = (data: RegisterParams): Promise<NormalResponse> => {
  return request({
    url: '/v1/user/login',
    method: 'POST',
    data,
  });
};

/** 获取用户信息 */
export const getInfo = (): Promise<NormalResponse> => {
  return request({
    url: '/v1/user/info',
    method: 'GET',
    headers: {
      requireToken: true,
    },
  });
};

/** 修改用户信息 */
export const updateInfo = (data: UserInfoPut): Promise<NormalResponse> => {
  return request({
    url: '/v1/user/info',
    method: 'PUT',
    data,
    headers: {
      requireToken: true,
    },
  });
};
