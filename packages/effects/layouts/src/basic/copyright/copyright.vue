<!--
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-07 21:03:54
 * @LastEditTime: 2024-09-09 13:51:11
 * @Description: 版权相关设置
-->
<script lang="ts" setup>
interface Props {
  companyName: string;
  companySiteLink?: string;
  date: string;
  icp?: string;
  icpLink?: string;
}

defineOptions({
  name: 'Copyright',
});

withDefaults(defineProps<Props>(), {
  companyName: 'Vben Admin',
  companySiteLink: '',
  date: '2024',
  icp: '',
  icpLink: '',
});
</script>

<template>
  <div class="text-md flex-center">
    <!-- ICP Link -->
    <a
      v-if="icp"
      :href="icpLink || 'javascript:void(0)'"
      class="hover:text-primary-hover mx-1"
      target="_blank"
    >
      {{ icp }}
    </a>

    <!-- Copyright Text -->
    Copyright © {{ date }}

    <!-- Company Link -->
    <a
      v-if="companyName"
      :href="companySiteLink || 'javascript:void(0)'"
      class="hover:text-primary-hover mx-1"
      target="_blank"
    >
      {{ companyName }}
    </a>
  </div>
</template>
