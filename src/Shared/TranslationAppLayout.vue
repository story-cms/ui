<template>
  <div class="bg-gray-50">
    <HeaderBar ref="translationNavigationComponent" />
    <div ref="translationHeader" class="w-full bg-gray-50">
      <ContentHeader :title="chapterTitle" @delete="emit('delete')" @info="emit('info')">
        <WorkflowButtons
          @submit="emit('submit')"
          @publish="emit('publish')"
          @request-change="emit('request-change')"
        />
      </ContentHeader>
      <div
        class="grid max-w-5xl lg:place-content-center [&>h3]:pb-2 [&>h3]:pl-6 [&>h3]:text-lg/8 [&>h3]:font-semibold [&>h3]:text-gray-800"
        :class="
          drafts.isSingleColumn
            ? 'grid-cols-2'
            : 'mx-auto  grid-cols-[repeat(2,_minmax(calc(64rem/2),_1fr))] overflow-auto'
        "
      >
        <h3>{{ shared.language.language }}</h3>
        <h3 class="inline-flex items-center">
          English
          <span class="ml-2">
            <Icon
              name="eyeoff"
              class="h-8 w-8 cursor-pointer text-black"
              @click.prevent="toggle"
            />
          </span>
        </h3>
      </div>
      <hr class="col-span-full" />
    </div>
    <div class="mx-2 overflow-x-auto">
      <div
        class="relative grid min-h-screen max-w-5xl gap-x-2 [&>section]:mt-2"
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
import { useDraftsStore, useSharedStore } from '../store';
import ContentHeader from './ContentHeader.vue';
import WorkflowButtons from '../Draft/WorkflowButtons.vue';

defineProps<{
  chapterTitle: string;
}>();

const emit = defineEmits(['delete', 'publish', 'request-change', 'submit', 'info']);

const shared = useSharedStore();
const drafts = useDraftsStore();

const toggle = () => {
  const fresh = !drafts.isSingleColumn;
  drafts.setSingleColumn(fresh);
};
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
