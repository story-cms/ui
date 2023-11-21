<template>
  <div
    class="relative mt-12 max-w-[416px] bg-gray-200 p-9 font-['Inter'] text-gray-600 shadow-sm"
  >
    <button
      class="absolute -right-2 -top-2 inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white"
    >
      <icon name="cross" class="h-6 w-6" />
    </button>
    <section class="space-y-2 font-['Inter'] text-lg/7 font-bold">
      <div class="grid grid-cols-2">
        <p>{{ props.storyType }}</p>
        <span class="place-self-end">{{ drafts.story.name }}</span>
      </div>
      <div class="grid grid-cols-2">
        <p>Chapter</p>
        <span class="place-self-end">{{ props.chapterType }}</span>
      </div>
    </section>
    <div class="my-2 border-t border-gray-600"></div>
    <section class="space-y-2 font-['Inter'] text-lg/7 font-medium">
      <div class="grid grid-cols-2">
        <p>Created</p>
        <span class="place-self-end">{{ formatDate(props.createdAt) }}</span>
      </div>
      <div class="grid grid-cols-2">
        <p>Auto-saved</p>
        <span class="place-self-end">{{ formatDate(props.updatedAt) }}</span>
      </div>
      <div class="grid grid-cols-2">
        <p>Last Published</p>
        <span class="place-self-end">{{ formatDate(props.updatedAt) }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';
import { ChapterMeta, Meta } from './interfaces';
import { formatDate } from './helpers';
import { useDraftsStore } from '../store';

const props = defineProps<Pick<Meta, 'storyType' | 'chapterType'> & ChapterMeta>();

const drafts = useDraftsStore();
</script>
