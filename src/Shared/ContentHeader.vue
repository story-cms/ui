<template>
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
</template>

<script setup lang="ts">
import Icon from './Icon.vue';
defineProps<{
  title: string;
}>();
const emit = defineEmits(['delete', 'info', 'app-preview']);
</script>
