/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-08-11 16:05:57
 * @LastEditTime: 2024-09-10 20:39:08
 * @Description: 基础api
 */

import { requestClient } from '#/common/base/baseApi/request';

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
  protected add = <V>(
    method: RequestType,
    url: string,
    params?: any,
  ): Promise<V> => {
    if (url.startsWith('/')) {
      url = url.slice(1);
    }

    return baseApi({
      method,
      params,
      url: `${this.baseUrl}/${url}`,
    }) as Promise<V>;
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
  list = (): Promise<T[]> => {
    return baseApi({
      method: RequestType.POST,
      url: `${this.baseUrl}/list`,
    }) as Promise<T[]>;
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
