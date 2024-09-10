import { useAppConfig } from '@vben/hooks';

import { BaseApi } from '#/common/base/baseApi/baseApi';
import { type BaseEntity, RequestType } from '#/common/base/baseApi/types';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-09 14:21:39
 * @LastEditTime: 2024-09-09 20:39:16
 * @Description: fungusApi
 */

export interface Fungus extends BaseEntity {
  extra: string;
  images: string[];
  phone: string;
  position: string;
  reply?: string[];
}

class FungusApi extends BaseApi<Fungus> {
  override baseUrl: string = '/fungus';

  GetFileUrl = (filename: string) => `${apiURL}/system/files/${filename}`;

  list = () => this.add(RequestType.GET, '/list');

  listFilter = (mode: number) =>
    this.add(RequestType.POST, '/list/filter', mode);

  reply = (params: { id: string; reply: string }) =>
    this.add(RequestType.POST, '/reply', params);
}

export const fungusApi = new FungusApi();
