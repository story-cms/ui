<template>
  <div class="bg-gray-50">
    <HeaderBar ref="translationNavigationComponent" />
    <div ref="translationHeader" class="w-full">
      <ChapterHeader @delete="emit('delete')" @publish="emit('publish')" />
    </div>
    <div class="mx-2 overflow-x-auto">
      <div
        class="grid max-w-5xl gap-x-2 [&>section]:mt-2"
        :class="
          drafts.isSingleColumn
            ? 'grid-cols-1 lg:mx-auto'
            : 'mx-auto grid-flow-col-dense grid-cols-[repeat(2,_minmax(calc(64rem/2),_1fr))] overflow-x-auto lg:place-content-center'
        "
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import HeaderBar from './HeaderBar.vue';
import ChapterHeader from './ChapterHeader.vue';
import { useDraftsStore } from '../store';

const emit = defineEmits(['delete', 'publish']);
const drafts = useDraftsStore();

const translationNavigationComponent = ref<typeof HeaderBar | null>(null);
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
</script>
