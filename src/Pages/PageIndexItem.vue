<template>
  <div class="grid grid-cols-12">
    <div class="col-span-1 flex items-center justify-center">
      <Icon name="drag" class="h-5 w-auto text-gray-400" />
    </div>
    <div
      class="space-x- col-span-11 flex justify-between space-x-3 rounded-lg border py-4 px-7 shadow"
    >
      <div class="flex items-center">
        <img :src="props.icon" class="h-6 w-6" />
        <div class="ml-5 text-lg leading-7">
          <p class="font-bold text-gray-800">{{ props.title }}</p>
          <p class="font-medium text-gray-500">{{ props.description }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-5">
        <span
          class="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-500/100"
        >
          Live
        </span>
        <Icon name="menu" class="h-5 w-5 text-gray-900" />
      </div>
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
