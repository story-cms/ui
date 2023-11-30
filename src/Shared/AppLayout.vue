<template>
  <div ref="app_layout" class="min-h-screen bg-app_gray">
    <h3>{{ shared.isLargeScreen }}</h3>
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSharedStore } from '../store';
const shared = useSharedStore();

const app_layout = ref<HTMLElement | null>(null);

const resizeObserver = (element: HTMLElement) => {
  const instance = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width } = entry.contentRect;
      shared.setLargeScreen(width >= 1280);
    }
  });
  instance.observe(element);
};

onMounted(() => {
  resizeObserver(app_layout.value as HTMLElement);
});
</script>
