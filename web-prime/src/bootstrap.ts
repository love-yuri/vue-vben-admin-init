/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-08 15:42:02
 * @LastEditTime: 2024-09-08 18:21:08
 * @Description: 启动配置
 */
import { createApp } from 'vue';

import { registerAccessDirective } from '@vben/access';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/ele';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import { setupI18n } from '#/locales';

import App from './app.vue';
import { router } from './router';

async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 国际化 i18n 配置
  await setupI18n(app);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  // 安装权限指令
  registerAccessDirective(app);

  // 配置路由及路由守卫
  app.use(router);

  // 配置primevue
  app.use(ToastService);
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Aura,
    },
  });

  app.mount('#app');
}

export { bootstrap };
