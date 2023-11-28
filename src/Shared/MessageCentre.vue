<template>
  <div
    class="[&>span]:justify-center] flex h-24 w-full items-center justify-center space-x-6 bg-white [&>span]:flex [&>span]:items-center [&>span]:space-x-6"
  >
    <span v-if="response === 0">
      <Icon class="text-red-500" :name="'exclamation'" />
      <span>{{ message }}</span>
    </span>
    <span v-if="response === 1">
      <Icon class="text-red-500" :name="'check'" />
      <span>{{ message }}</span>
    </span>
    <span v-if="response === 2">
      <Icon class="text-green-500" :name="'badge-check'" />
      <span>{{ message }}</span>
    </span>
    <span v-if="response === 3">
      <Icon class="text-yellow-500" :name="'information-circle'" />
      <span>{{ message }}</span>
    </span>
  </div>
</template>
<script setup lang="ts">
import Icon from './Icon.vue';
import { ResponseStatus } from './interfaces';

defineProps<{
  response: ResponseStatus;
  message: string;
}>();
</script>
