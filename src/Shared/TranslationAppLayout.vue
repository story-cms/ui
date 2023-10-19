<template>
  <div class="bg-white">
    <TranslationNavigation
      ref="translationNavigationComponent"
      :meta="props.meta"
      :stories="props.stories"
      :story="props.story"
      :user="props.user"
    />
    <div ref="translationHeader" class="w-full">
      <TranslationHeader
        :chapter-title="props.chapterTitle"
        :has-edit-review="props.hasEditReview"
        :draft-status="props.draftStatus"
        :user="props.user"
        @toggle="toggle"
      />
    </div>
    <div
      class="mx-2 grid gap-x-2 bg-gray-50 [&>section]:mt-2 [&>section]:rounded [&>section]:bg-white [&>section]:shadow"
      :class="isSingleColumn ? 'grid-cols-1' : 'grid-cols-2'"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, PropType } from 'vue';

import TranslationNavigation from './TranslationNavigation.vue';
import TranslationHeader from './TranslationHeader.vue';

import { Meta, Story, User } from './interfaces';

const props = defineProps({
  chapterTitle: {
    type: String,
    required: true,
  },
  hasEditReview: {
    type: Boolean,
    required: true,
  },
  draftStatus: {
    type: String,
    required: true,
  },
  meta: {
    type: Object as PropType<Meta>,
    required: true,
  },
  story: {
    type: Object as PropType<Story>,
    required: true,
  },
  stories: {
    type: Array as PropType<string[]>,
    required: true,
  },
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const translationNavigationComponent = ref<typeof TranslationNavigation | null>(null);
const translationHeader = ref<HTMLElement | null>(null);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    !entry.isIntersecting
      ? translationHeader.value?.classList.add(...['fixed', 'top-0', 'z-10'])
      : translationHeader.value?.classList.remove(...['fixed', 'top-0', 'z-10']);
  }),
    {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
});

onMounted(() => {
  observer.observe(translationNavigationComponent.value?.navbar as HTMLElement);
});

const isSingleColumn = ref(false);

const emit = defineEmits(['isSingleColumn']);

const toggle = () => {
  isSingleColumn.value = !isSingleColumn.value;
  emit('isSingleColumn', isSingleColumn.value);
};
</script>
