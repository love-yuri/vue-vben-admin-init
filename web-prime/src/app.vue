<!--
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-08 15:42:02
 * @LastEditTime: 2024-09-08 23:23:33
 * @Description: app
-->

<template>
  <Toast />
  <RouterView />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import { initToast } from '#/common/utils/message';

defineOptions({ name: 'App' });

/**
 * 初始化Toast
 * 将 toast实例注册进pinia中
 */
function init(): void {
  initToast(useToast());
}

onMounted(init);
</script>
