/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-08-11 20:09:08
 * @LastEditTime: 2024-09-08 19:24:04
 * @Description: 全局消息通知
 *
 * 如果出现消息无法显示的情况，请检查useToastStore中是否有正确初始化
 */
import type { ToastMessageOptions } from 'primevue/toast';
import type { ToastServiceMethods } from 'primevue/toastservice';

import { type Ref, ref, unref } from 'vue';

const toast: Ref<ToastServiceMethods | undefined> = ref(undefined);

export function initToast(t: ToastServiceMethods) {
  toast.value = t;
}

export function useMessage() {}

const defaultValue = {
  life: 3000, // 消息显示时间, 单位ms
} as const;

/**
 * 发送通知Toast
 * 基础函数，不检查参数类型
 * 所有消息的基础封装
 */
function sendMsg(msg: ToastMessageOptions): void {
  unref(toast)?.add({
    life: msg.life || defaultValue.life,
    ...msg,
  });
}

function info(msg: string | ToastMessageOptions): void {
  if (typeof msg === 'string') {
    msg = { detail: msg };
  }
  sendMsg({ severity: 'info', ...msg });
}

function success(msg: string | ToastMessageOptions): void {
  if (typeof msg === 'string') {
    msg = { detail: msg };
  }
  sendMsg({ severity: 'success', ...msg });
}

function error(msg: string | ToastMessageOptions): void {
  if (typeof msg === 'string') {
    msg = { detail: msg };
  }
  sendMsg({ severity: 'error', ...msg, life: 5000 });
}

export default {
  error,
  info,
  success,
};
