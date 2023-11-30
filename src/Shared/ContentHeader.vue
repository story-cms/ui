<template>
  <div ref="contentHeaderEl" class="w-full bg-gray-50">
    <div class="container mx-auto">
      <div class="flex items-center justify-between py-6">
        <h3 class="font-['Inter'] text-lg font-bold leading-7 text-gray-800">
          {{ title }}
        </h3>
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
import { onMounted, ref } from 'vue';
import Icon from './Icon.vue';

defineProps<{
  title: string;
}>();
const emit = defineEmits(['delete', 'info', 'app-preview']);

const contentHeaderEl = ref<HTMLElement | null>(null);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      !entry.isIntersecting
        ? contentHeaderEl.value?.classList.add(...['fixed', 'top-0', 'z-10'])
        : contentHeaderEl.value?.classList.remove(...['fixed', 'top-0', 'z-10']);
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
  // if(navbar ) navbar.reset();
  observer.observe(navbar);
});
</script>
