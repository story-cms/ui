import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PageItem } from 'App/Models/Interfaces';

export const usePagesStore = defineStore('pages', () => {
  const items = ref<PageItem[]>([]);

  const setItems = (fresh: PageItem[]) => {
    items.value = fresh;
  };

  return {
    items,
    setItems,
  };
});
