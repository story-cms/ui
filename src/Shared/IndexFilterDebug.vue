<template>
  <div class="sm:block">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          class="flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
          :class="
            tab.current
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700'
          "
          :aria-current="tab.current ? 'page' : undefined"
          @click.prevent="emit('change', tab.label)"
        >
          {{ tab.label }} - {{ currentTab }}
          <span
            v-if="tab.count"
            class="ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block"
            :class="
              tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900'
            "
            >{{ tab.count }}</span
          >
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import type { TabItem } from './interfaces';

const props = defineProps({
  tabs: {
    type: Array<TabItem>,
    required: true,
  },
  currentTab: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['change']);

// const watchedCurrent = computed(() => {
//   console.log('! watching');
//   return props.currentTab;
// });

const theCurrentTab = ref(props.currentTab);

watch(
  () => props.currentTab,
  (first, second) => {
    console.log('Watch props.selected function called with args:', first, second);
  },
);

const tabs = computed(() => {
  const result = props.tabs.map((tab: TabItem) => ({
    ...tab,
    current: tab.label === props.currentTab,
  }));
  console.log(result);
  return result;
});
</script>
