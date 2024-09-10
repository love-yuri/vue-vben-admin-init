/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-10 16:37:25
 * @LastEditTime: 2024-09-10 22:51:25
 * @Description:
 */
/**
 * 该文件可自行根据业务逻辑进行调整
 */
import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import { RequestClient } from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { SystemCode } from '#/common/constants/systemCode';
import message from '#/common/utils/message';
import { router } from '#/router';
import { LOGIN_PATH } from '@vben/constants';
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

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();
      config.headers.Authorization = accessStore.accessToken;
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
    async rejected(error) {
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
          // window.location.href = '/login';
          const accessStore = useAccessStore();
          if (accessStore.isAccessChecked) {
            accessStore.setLoginExpired(true);
          } else {
            // 回登陆页带上当前路由地址
            await useAuthStore().logout();
            await router.replace({
              path: LOGIN_PATH,
              query: {
                redirect: encodeURIComponent(
                  router.currentRoute.value.fullPath,
                ),
              },
            });
          }
        }
        throw error;
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        message.error(`请求失败: 404网络未连接`);
        throw error;
      } else {
        // 其他错误，例如设置请求时发生了错误
        message.error(`请求失败: ${error.message}`);
        throw error;
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
