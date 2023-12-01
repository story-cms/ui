<template>
  <div class="min-h-screen bg-app_gray">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useSharedStore } from '../store';
const shared = useSharedStore();

const resizeHook = () => {
  const fresh = document.documentElement.clientWidth;
  shared.setLargeScreen(fresh >= 1116);
};

onMounted(() => {
  window.addEventListener('resize', resizeHook);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeHook);
});
</script>
