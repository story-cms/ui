<template>
  <div class="space-y-10">
    <div
      v-for="(page, index) in items"
      :key="page.title"
      draggable="true"
      @dragstart="onDragStart($event), (fromIndex = items.indexOf(page))"
      @dragend="onDragEnd($event)"
      @dragover="onDragOver($event)"
      @dragenter="toIndex = items.indexOf(page)"
      @dragleave="onDragLeave($event)"
      @drop="onDrop()"
    >
      <PageIndexItem
        :title="page.title"
        :icon="page.icon"
        :description="page.description"
        :is-published="page.isPublished"
        :body="page.body"
        :is-divider="page.isDivider"
        @remove-divider="removeDivider(index)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { usePagesStore } from '../store';
import PageIndexItem from './PageIndexItem.vue';

const pages = usePagesStore();

const items = ref([...pages.items]);

const fromIndex = ref();
const toIndex = ref();
const onDragStart = (event: DragEvent) => {
  const target = event.target as Element;
  target.classList.add('bg-blue-200');
};
const onDragEnd = (event: DragEvent) => {
  const target = event.target as Element;
  target.classList.remove('bg-blue-200');
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const onDragLeave = (event: DragEvent) => {
  const target = event.target as Element;
  target.classList.remove('bg-purple-300');
  target.classList.remove('bg-blue-200');
};

const onDrop = () => {
  swapListItems(items.value, fromIndex.value, toIndex.value);
  pages.setItems(items.value);

  fromIndex.value = null;
  toIndex.value = null;
};

const swapListItems = (items: any[], fromIndex: number, toIndex: number) => {
  const element = items[fromIndex];
  items.splice(fromIndex, 1);
  items.splice(toIndex, 0, element);
};

const removeDivider = (index: number) => {
  items.value = [...items.value.slice(0, index), ...items.value.slice(index + 1)];
  pages.setItems(items.value);
};
</script>
