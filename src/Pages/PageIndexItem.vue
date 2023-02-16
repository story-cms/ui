<template>
  <div class="flex items-center space-x-4 px-2 py-1">
    <Icon name="drag" />
    <div class="flex items-center space-x-4 rounded px-4 py-2 shadow-md">
      <img :src="props.icon" class="h-6 w-6" />
      <div class="">
        <p class="font-semibold">{{ props.title }}</p>
        <p>{{ props.description }}</p>
      </div>
      <Icon name="menu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/Shared/Icon.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
