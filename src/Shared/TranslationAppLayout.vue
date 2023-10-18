<template>
  <TranslationShellNav ref="translationShellNavComponent" />
  <div ref="translationHeader" class="w-full bg-gray-50">
    <TranslationHeader
      :chapter-title="props.chapterTitle"
      :has-edit-review="props.hasEditReview"
      :draft-status="props.draftStatus"
      :user-role="props.userRole"
    />
  </div>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import TranslationShellNav from './TranslationShellNav.vue';
import TranslationHeader from './TranslationHeader.vue';

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
  userRole: {
    type: String,
    required: true,
  },
});

const translationShellNavComponent = ref<typeof TranslationShellNav | null>(null);
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
  observer.observe(translationShellNavComponent.value?.navbar as HTMLElement);
});
</script>
