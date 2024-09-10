/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-08-22 22:56:44
 * @LastEditTime: 2024-08-23 00:07:02
 * @Description: localStorage封装
 */
const Prefix = 'yuri'; // 前缀
export enum StorageType {
  UserInfo = `${Prefix}_UserInfo`,
}

// 所有localStorage存储的东西，都需要继承自StorageClass
export interface StorageClass {}

/**
 * @description: 本地用户信息存储
 */
export interface LocalUserInfo extends StorageClass {
  id: number;
  username: string;
  token: string;
}

/**
 * @description: 设置localStorage
 * @param {StorageType} key
 */
export const SetItem = <T extends StorageClass>(key: StorageType, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description: 获取localStorage
 * @param {StorageType} key
 */
export const GetItem = <T extends StorageClass>(key: StorageType): T | undefined => {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : undefined;
};

/**
 * @description: 删除localStorage
 * @param {StorageType} key
 */
export const RemoveItem = (key: StorageType) => localStorage.removeItem(key);
