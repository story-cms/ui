<template>
  <div class="bg-gray-50">
    <TranslationNavigation
      ref="translationNavigationComponent"
      :meta="props.meta!"
      :language="props.language!"
      :stories="props.stories!"
      :story-name="props.storyName!"
      :user="props.user!"
    />
    <div ref="translationHeader" class="w-full">
      <TranslationHeader
        :chapter-title="props.chapterTitle"
        :has-edit-review="props.hasEditReview"
        :draft-status="props.draftStatus"
        :user="props.user!"
      />
    </div>
    <div class="mx-2 overflow-x-auto">
      <div
        class="grid max-w-5xl gap-x-2 [&>section]:mt-2"
        :class="
          store.isSingleColumn
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

import TranslationNavigation from './TranslationNavigation.vue';
import TranslationHeader from './TranslationHeader.vue';
import { Meta, LanguageSpecification, User } from './interfaces';
import { useLanguageStore } from '../store';

const props = defineProps<{
  chapterTitle: string;
  hasEditReview: boolean;
  draftStatus: string;
  // shared page props
  meta: Meta;
  language: LanguageSpecification;
  storyName: string;
  stories: string[];
  user: User;
}>();

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

const store = useLanguageStore();
</script>
