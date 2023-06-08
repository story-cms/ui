<template>
  <Story title="Index Filter" group="shared">
    <Variant title="With tabs">
      <IndexFilter :tabs="tabItems" :currentTab="currentTab" @change="changeTab" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import IndexFilter from './IndexFilter.vue';
import type { TabItem } from './interfaces';
import { ref } from 'vue';

const currentTab = ref('All');
const changeTab = (tab: string) => {
  currentTab.value = tab;
};

const tabItems: TabItem[] = [
  {
    label: 'All',
    count: 0,
  },
  {
    label: 'Published',
    count: 0,
  },
  {
    label: 'Drafts',
    count: 0,
  },
  {
    label: 'Archived',
    count: 0,
  },
];
</script>
