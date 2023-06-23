<template>
  <div class="sticky top-0 h-full w-[416px]">
    <div
      class="space-y-5 rounded-md border border-accent-gray bg-accent-gray p-8 shadow-sm"
    >
      <div class="space-y-8 text-[18px] font-medium leading-7 text-gray-600">
        <div class="space-y-1 border-b border-gray-600">
          <div class="grid grid-cols-2 font-bold">
            <p class="mr-2">Devotion</p>
            <span class="text-right">{{ chapter.number }}</span>
          </div>
          <div class="grid grid-cols-2">
            <p class="mr-2">Created</p>
            <span class="text-right">{{ formatDate(chapter.created_at) }}</span>
          </div>
          <div class="grid grid-cols-2">
            <p class="mr-2">Last Published</p>
            <span class="text-right">{{ formatDate(chapter.updated_at) }}</span>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-between space-y-4 xl:flex-row xl:space-y-0"
      >
        <!-- class="inline-flex w-full items-center justify-center rounded-md border-2 border-accent-one bg-transparent px-3 py-2 text-sm font-medium leading-5 text-accent-one hover:opacity-80 hover:shadow-md active:opacity-80" -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from './helpers';
import { PropType } from 'vue';
defineProps({
  chapter: {
    type: Object as PropType<Chapter>,
    required: true,
  },
});

type Chapter = {
  number: number;
  created_at: string;
  updated_at: string;
};
</script>
