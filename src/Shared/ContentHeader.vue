<template>
  <div
    class="w-full bg-gray-50"
    :class="{ 'fixed inset-x-0 top-0 z-10': !shared.isIntersecting }"
  >
    <div class="container mx-auto px-3">
      <div class="flex items-center justify-between py-6">
        <!-- eslint-disable vue/no-v-html -->
        <h3
          class="font-['Inter'] text-2xl font-semibold text-gray-800 [&>span]:text-gray-400"
          v-html="title"
        ></h3>
        <div class="flex items-center space-x-6">
          <button
            type="button"
            class="grid h-[42px] w-[42px] cursor-pointer place-content-center rounded-full border border-gray-300 bg-white"
            @click.prevent="emit('info')"
          >
            <Icon name="info" class="h-auto w-6 cursor-pointer text-gray-500" />
          </button>
          <button
            type="button"
            class="grid h-[42px] w-[42px] cursor-pointer place-content-center rounded-full border border-gray-300 bg-white"
            @click.prevent="emit('app-preview')"
          >
            <Icon name="mobile" class="h-auto w-6 cursor-pointer text-gray-500" />
          </button>
          <button
            type="button"
            class="grid h-[42px] w-[42px] cursor-pointer place-content-center rounded-full border border-gray-300 bg-white"
            @click="emit('delete')"
          >
            <Icon
              name="trash"
              class="flex h-auto w-6 cursor-pointer items-center justify-center text-gray-500"
            />
          </button>
          <slot></slot>
        </div>
      </div>
      <div>
        <slot name="labels"></slot>
      </div>
    </div>
    <hr class="col-span-full" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Icon from './Icon.vue';
import { useSharedStore } from '../store';

defineProps<{
  title: string;
}>();
const emit = defineEmits(['delete', 'info', 'app-preview']);

const shared = useSharedStore();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      shared.setIsIntersecting(entry.isIntersecting);
    });
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  },
);

onMounted(() => {
  const navbar = document.getElementById('navbar') as HTMLElement;
  observer.observe(navbar);
});
</script>
