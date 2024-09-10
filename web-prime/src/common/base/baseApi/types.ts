/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-09 14:18:19
 * @LastEditTime: 2024-09-09 14:19:44
 * @Description: baseApi types
 */

/**
 * @description: 请求类型
 */
export enum RequestType {
  GET,
  POST,
}

/**
 * @description: 请求配置
 */
export type RequestConfig = {
  method: RequestType;
  params?: any;
  url: string;
};

export interface BaseEntity {
  id: string;
}
