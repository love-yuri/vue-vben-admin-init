/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-08 15:42:02
 * @LastEditTime: 2024-09-09 13:01:57
 * @Description: 项目配置文件
 */
import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    // 指定路由方式为前端路由
    accessMode: 'frontend',
    name: import.meta.env.VITE_APP_TITLE,
  },
  copyright: {
    enable: false,
  },
});
