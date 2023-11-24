<template>
  <div class="min-h-screen bg-app_gray">
    <NavigationBar />

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from './NavigationBar.vue';
</script>
