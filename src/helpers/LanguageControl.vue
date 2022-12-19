<template>
  <div>
    <HstButton color="primary" class="bg-emerald-500 htw-p-2" @click="toggle">
      {{ label }}
    </HstButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLanguageStore } from "../store";

const store = useLanguageStore();
const label = computed(() => {
  return store.isRtl ? "Set LTR" : "Set RTL";
});
const toggle = () => {
  if (store.isRtl) {
    store.setLanguage("English");
  } else {
    store.setLanguage("عربى");
  }
};
</script>
