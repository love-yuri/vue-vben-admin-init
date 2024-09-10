/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-08-11 16:05:57
 * @LastEditTime: 2024-09-09 14:20:00
 * @Description: 基础api
 */

import { requestClient } from '#/api/request';

import { type BaseEntity, type RequestConfig, RequestType } from './types';

// 定义基础API函数
async function baseApi(config: RequestConfig): Promise<unknown> {
  switch (config.method) {
    case RequestType.GET: {
      return await requestClient.get(config.url, {
        params: config.params,
      });
    }
    case RequestType.POST: {
      return requestClient.post(config.url, config.params);
    }
  }
}

/**
 * 抽象基类
 * @description 提供基础的API请求方法
 */
export abstract class BaseApi<T extends BaseEntity> {
  // 基础添加函数
  protected add = (
    method: RequestType,
    url: string,
    params?: any,
  ): Promise<any> => {
    if (url.startsWith('/')) {
      url = url.slice(1);
    }

    return baseApi({
      method,
      params,
      url: `${this.baseUrl}/${url}`,
    });
  };

  abstract readonly baseUrl: string;

  // 创建
  create = (params: T): Promise<boolean> => {
    return baseApi({
      method: RequestType.POST,
      params,
      url: `${this.baseUrl}/create`,
    }) as Promise<boolean>;
  };

  // 删除
  delete = (id: number | string): Promise<boolean> => {
    return baseApi({
      method: RequestType.POST,
      url: `${this.baseUrl}/delete/${id}`,
    }) as Promise<boolean>;
  };

  // 列表
  page = (params: any): Promise<T[]> => {
    return baseApi({
      method: RequestType.POST,
      params,
      url: `${this.baseUrl}/page`,
    }) as Promise<T[]>;
  };

  // 更新
  update = (params: any): Promise<boolean> => {
    return baseApi({
      method: RequestType.POST,
      params,
      url: `${this.baseUrl}/update`,
    }) as Promise<boolean>;
  };
}
