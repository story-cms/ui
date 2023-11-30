<template>
  <div class="min-h-screen bg-app_gray">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useSharedStore } from '../store';
const shared = useSharedStore();

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
  resizeObserver(document.body);
});
</script>
