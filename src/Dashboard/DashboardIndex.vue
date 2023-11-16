<template>
  <AppLayout>
    <div class="my-4 flex items-center justify-between">
      <h3 class="text-xl font-semibold">{{ meta.storyType }}: {{ story }}</h3>
      <icon :name="iconName" class="h-8 w-8 text-black" @click.prevent="toggle" />
    </div>

    <div class="mb-4 flex items-center justify-between">
      <div class="flex space-x-6">
        <input
          v-model="filterNumber"
          class="block w-24 rounded-md border border-gray-300 px-3 py-1 text-sm font-normal leading-5 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          :placeholder="meta.chapterType"
        />
        <AddItemButton v-if="!isComplete && newTranslationStatus == 'primary'" :label="meta.chapterType" @add="addDraft" />
        <button
          v-if="newTranslationStatus == 'no-source'"
          type="button"
          class="inline-flex items-center rounded-xl bg-indigo-50 px-3 py-[9px] text-sm font-medium leading-4 text-indigo-700 shadow-sm"
          disabled
        >
        No more days available to translate
        </button>
        <button
          v-if="isComplete && newTranslationStatus !== 'primary'"
          type="button"
          class="inline-flex items-center rounded-xl bg-indigo-50 px-3 py-[9px] text-sm font-medium leading-4 text-app_green shadow-sm"
          disabled
        >
        All days translated
        </button>
      </div>
      <IndexFilter :tabs="tabs" :current-tab="currentTab" @change="onFilter" />
    </div>
    <div
      class="grid grid-cols-1 gap-4"
      :class="{ ' sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5': !isList }"
    >
      <index-card
        v-for="item in filteredIndex"
        :key="item.number"
        :item="item"
        :is-list="isList"
        :scope="currentTab"
        :chapter-name="meta.chapterType"
        @tap="onTap"
      />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppLayout from '../Shared/AppLayout.vue';
import { usePage } from '@inertiajs/vue3';
import Icon from '../Shared/Icon.vue';
import AddItemButton from '../Shared/AddItemButton.vue';
import IndexFilter from '../Shared/IndexFilter.vue';
import IndexCard from '../Chapters/IndexCard.vue';
import { IndexReadyItem, SharedPageProps, DashboardProps } from '../Shared/interfaces';
import { useSharedStore } from '../store';

const props = defineProps<DashboardProps & SharedPageProps>();

useSharedStore().setFromProps(props);

const isList = ref(false);
const toggle = () => {
  isList.value = !isList.value;
};

const filterNumber = ref<string | null>(null);
const currentTab = ref('Live');

const addDraft = () => (window.location.href = '/draft/create');

const onFilter = (tab: string) => {
  currentTab.value = tab;
};

const story = computed(() => usePage().props.storyName as string);
const iconName = computed(() => {
  return isList.value ? 'list' : 'grid';
});
const filteredIndex = computed(() => {
  const needle = currentTab.value === 'Live' ? 'Live' : 'Draft';

  return props.index.filter((item) => {
    const hasTag = item.tags.includes(needle);
    if (!filterNumber.value) return hasTag;

    return hasTag && item.number.toString().startsWith(filterNumber.value);
  });
});

const tabs = computed(() => {
  const liveCount = props.index.reduce(
    (carry, item) => (item.tags.includes('Live') ? carry + 1 : carry),
    0,
  );

  const draftCount = props.index.reduce(
    (carry, item) => (item.tags.includes('Draft') ? carry + 1 : carry),
    0,
  );

  return [
    { label: 'Live', count: liveCount },
    { label: 'Drafts', count: draftCount },
  ];
});

const onTap = (item: IndexReadyItem) => {
  if (currentTab.value == 'Drafts') {
    window.location.href = `/draft/${item.number}/edit`;
  } else {
    // window.location.href = `/draft/${item.number}/edit`;
    window.location.href = `/chapter/${item.number}`;
  }
};
</script>
