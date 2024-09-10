<template>
  <div class="h-full w-full overflow-y-auto p-2">
    <div class="mb-4 flex flex-row">
      <Button
        :severity="mode === 0 ? 'success' : 'info'"
        class="mx-2"
        label="查看所有"
        @click="show(0)"
      />
      <Button
        :severity="mode === 1 ? 'success' : 'info'"
        class="mx-2"
        label="仅查看已回复"
        @click="show(1)"
      />
      <Button
        :severity="mode === 2 ? 'success' : 'info'"
        class="mx-2"
        label="仅查看未回复"
        @click="show(2)"
      />
    </div>
    <AnalysisChartCard
      v-for="(item, index) in fungus"
      :key="index"
      :title="`备注: ${item.extra}`"
      class="mb-4 w-full"
    >
      <div class="flex flex-row">
        <Galleria
          :num-visible="5"
          :show-indicators="true"
          :show-thumbnails="false"
          :value="item.images.map((img) => fungusApi.GetFileUrl(img))"
          container-style="max-width: 640px"
        >
          <template #item="slotProps">
            <img :src="slotProps.item" style="width: 100%; display: block" />
          </template>
        </Galleria>
        <div class="ml-2 h-full w-full">
          <Card class="mb-2">
            <template #title>手机: {{ item.phone }}</template>
            <template #content>
              <p class="m-0">地址: {{ item.position }}</p>
            </template>
          </Card>
          <div
            v-for="(rep, ind) in item.reply ?? []"
            :key="ind"
            class="mb-2 flex w-full flex-row items-center"
          >
            <SvgAvatar1Icon class="size-8" />
            <div class="text-[20px]">评论: {{ rep }}</div>
          </div>

          <div class="flex w-full flex-row items-center justify-between">
            <SvgAvatar1Icon class="size-8" />
            <InputText v-model="item.replyTemp" class="w-full" type="text" />
            <Button
              class="ml-2 flex-shrink-0"
              label="回复"
              @click="reply(item)"
            />
          </div>
        </div>
      </div>
    </AnalysisChartCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { AnalysisChartCard } from '@vben/common-ui';
import { SvgAvatar1Icon } from '@vben/icons';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Galleria from 'primevue/galleria';
import InputText from 'primevue/inputtext';

import { type Fungus, fungusApi } from '#/api/fungus';
import message from '#/common/utils/message';

interface Item extends Fungus {
  replyTemp: string;
}

const mode = ref(0);
const fungus = ref<Item[]>([]);

onMounted(() => {
  show();
});

function reply(item: Item) {
  if (!item.replyTemp) {
    message.error('请输入回复内容');
    return;
  }
  fungusApi
    .reply({
      id: item.id,
      reply: item.replyTemp,
    })
    .then((res: boolean) => {
      if (res) {
        message.success('回复成功');
        show();
      }
    });
}

function show(showModel: number = 0) {
  mode.value = showModel;
  fungusApi.listFilter(mode.value).then((res) => {
    fungus.value = res;
  });
}
</script>
