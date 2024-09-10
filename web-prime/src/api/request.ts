/**
 * 该文件可自行根据业务逻辑进行调整
 */
import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import { RequestClient } from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { SystemCode } from '#/common/constants/systemCode';
import message from '#/common/utils/message';
import { useAuthStore } from '#/store';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

/**
 * @description: 响应类型
 */
type R = {
  code: number;
  data: any;
  isSuccess: boolean;
  message: string;
};

function createRequestClient(baseURL: string) {
  const client = new RequestClient({
    baseURL,
  });

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();
      config.headers.Authorization = formatToken(accessStore.accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      return config;
    },
    rejected(error) {
      message.error('请求失败');
      return Promise.reject(error);
    },
  });

  // response数据解构
  client.addResponseInterceptor({
    fulfilled: (response) => {
      const data = response.data as R;
      if (data.isSuccess) {
        return data.data;
      } else {
        message.error(`请求失败! code: ${data.code} -> ${data.message}`);
        throw new Error(`请求失败! code: ${data.code} -> ${data.message}`);
      }
    },
    rejected(error) {
      message.error('请求失败0000000000');
      if (error.response) {
        // 请求已发出，服务器响应状态码不在 2xx 范围
        const data = error.response.data as R;
        message.error(`请求失败: ${data.code} -> ${data.message}`);

        // 如果是未登陆或token过期，跳转到登录页面
        if (
          [SystemCode.AccessTokenError, SystemCode.UNAUTHORIZED].includes(
            data.code,
          )
        ) {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        message.error(`请求失败: 404网络未连接`);
        return Promise.reject(error);
      } else {
        // 其他错误，例如设置请求时发生了错误
        message.error(`请求失败: ${error.message}`);
        return Promise.reject(error);
      }
    },
  });

  // // token过期的处理
  // client.addResponseInterceptor(
  //   authenticateResponseInterceptor({
  //     client,
  //     doReAuthenticate,
  //     doRefreshToken,
  //     enableRefreshToken: preferences.app.enableRefreshToken,
  //     formatToken,
  //   }),
  // );

  return client;
}

export const requestClient = createRequestClient(apiURL);

export const baseRequestClient = new RequestClient({ baseURL: apiURL });
