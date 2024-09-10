/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-08 15:42:02
 * @LastEditTime: 2024-09-10 00:08:05
 * @Description:
 */
import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'https://gu.thinkingcloud.top',
            ws: true,
          },
        },
      },
    },
  };
});
