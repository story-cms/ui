<template>
  <div class="grid grid-cols-12">
    <div class="col-span-1 flex items-center justify-center">
      <Icon name="drag" class="h-5 w-auto text-gray-400" />
    </div>
    <div
      class="col-span-11 rounded-lg border px-7 py-4 shadow"
      :class="{ 'py-1': props.isDivider }"
    >
      <div v-if="!props.isDivider" class="flex justify-between space-x-3">
        <div class="flex items-center">
          <img :src="props.icon" class="h-6 w-6" />
          <div class="ml-5 text-lg leading-7">
            <p class="font-bold text-gray-800">{{ props.title }}</p>
            <p class="font-medium text-gray-500">{{ props.description }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-5">
          <span
            class="rounded-full px-2 py-1 text-xs font-medium"
            :class="{
              'bg-green-500/20 text-green-500/100': props.isPublished,
              'bg-yellow-300 text-yellow-800': !props.isPublished,
            }"
          >
            {{ props.isPublished ? 'Live' : 'Draft' }}
          </span>
          <Icon v-if="isLink(props.body)" name="link" class="h-5 w-5 text-gray-900" />
          <Icon v-else name="menu" class="h-5 w-5 text-gray-900" />
        </div>
      </div>
      <div v-else class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-[calc(100%_-_56px)] border-t border-gray-300"></div>
        </div>
        <div class="relative flex items-center justify-end">
          <button
            type="button"
            class="flex h-3 w-3 items-center justify-center rounded-full border border-gray-300 bg-transparent p-5 text-sm font-medium leading-5 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="removeDivider()"
          >
            <Icon name="trash" class="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Shared/Icon.vue';

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
  body: {
    type: String,
    default: '',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isDivider: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['removeDivider']);

const isLink = (text: string) =>
  text.startsWith('http://') || text.startsWith('https://');

const removeDivider = () => {
  emit('removeDivider');
};
</script>
