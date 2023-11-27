<template>
  <div
    class="relative max-w-[416px] bg-gray-200 p-9 font-['Inter'] text-gray-600 shadow-sm"
    :class="{
      'mt-3': props.isFloating,
    }"
  >
    <button
      v-if="props.isFloating"
      type="button"
      class="absolute -right-2 -top-2 inline-flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white"
      @click.prevent="emit('close')"
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
        <span class="place-self-end">{{ publishedWhen }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';
import { ChapterMeta, Meta } from './interfaces';
import { formatDate } from './helpers';
import { useDraftsStore } from '../store';

interface Props {
  storyType: Meta['storyType'];
  chapterType: Meta['chapterType'];
  createdAt: ChapterMeta['createdAt'];
  updatedAt: ChapterMeta['updatedAt'];
  publishedWhen: string;
  isFloating?: boolean;
}

const props = defineProps<Props>();

const drafts = useDraftsStore();

const emit = defineEmits(['close']);
</script>
