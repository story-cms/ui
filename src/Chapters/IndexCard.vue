<template>
  <button
    class="flex rounded-lg bg-white text-left shadow"
    :class="{ 'flex-col': !isList }"
    type="button"
    @click="emit('tap', item)"
  >
    <div v-if="showImage" class="">
      <img class="rounded-t-lg" :src="imgUrl" alt="" />
    </div>
    <div
      class="flex justify-between"
      :class="{
        'min-w-full px-4 py-4': isList,
        'min-h-full flex-col items-start px-8 py-5': !isList,
      }"
    >
      <div class="grow">
        <h4 class="mb-1 font-bold text-gray-900">
          {{ chapterName }} {{ chapterNumber }}
        </h4>
        <p class="mb-3 text-gray-500" :class="{ 'text-sm': isList, 'text-xs': !isList }">
          {{ title }}
        </p>
      </div>

      <div v-if="tags.length > 0" class="flex items-center space-x-4">
        <StatusTag v-for="tag in tags" :tag="tag" :key="tag" />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import StatusTag from './StatusTag.vue';
import { IndexReadyItem } from 'App/Models/Interfaces';
import { padZero } from '../Shared/helpers';

const props = defineProps({
  item: {
    type: Object as PropType<IndexReadyItem>,
    required: true,
  },
  isList: {
    type: Boolean,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  placeholderImage: {
    type: String,
    default: '',
    required: false,
  },
  chapterName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['tap']);

const imgUrl = computed(() => props.item.imageUrl || props.placeholderImage);

const title = computed(
  () => props.item.title || `${props.chapterName} ${props.item.number}`,
);
const showImage = true;

const chapterNumber = computed(() => padZero(props.item.number));

const tags = computed(() => {
  if (props.scope == 'Live') {
    if (props.item.tags.includes('Draft')) {
      return ['Changed'];
    }
  } else {
    if (props.item.tags.includes('Live')) {
      return ['Changes'];
    }
    return ['New'];
  }
  return [];
});
</script>