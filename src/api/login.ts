import { HttpResponse } from '@/types';
import { UserInfoHttpResponse } from '@/types/login';
import request from '@/utils/request';

// 登录方法
export function login(
  username: string,
  password: string,
  code: string,
  uuid: string,
): Promise<HttpResponse<object> & { token: string }> {
  const data = {
    username,
    password,
    code,
    uuid,
  };
  return request({
    url: '/login',
    method: 'post',
    data: data,
  });
}

// 获取用户详细信息
export function getInfo(): Promise<UserInfoHttpResponse<object>> {
  return request({
    url: '/getInfo',
    method: 'get',
  });
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  });
}

// 获取验证码
export function getCodeImg(): Promise<
  HttpResponse<object> & { img: string; uuid: string }
> {
  return request({
    url: '/captchaImage',
    method: 'get',
  });
}
