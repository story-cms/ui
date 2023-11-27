<template>
  <div class="min-h-screen bg-app_gray">
    <HeaderBar />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar.vue';
</script>
