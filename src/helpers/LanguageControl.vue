<template>
  <div>
    <HstButton color="primary" class="htw-p-2 bg-emerald-500" @click="toggle">
      {{ label }}
    </HstButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLanguageStore } from '../store';

const store = useLanguageStore();
const label = computed(() => {
  return store.isRtl ? 'Set LTR' : 'Set RTL';
});
const toggle = () => {
  if (store.isRtl) {
    store.setLanguage('English');
  } else {
    store.setLanguage('عربى');
  }
};
</script>
