<template>
  <div class="min-h-screen bg-app_gray">
    <HeaderBar />
    <div class="container mx-auto p-3">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar.vue';
</script>
