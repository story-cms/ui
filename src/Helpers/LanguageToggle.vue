<template>
  <HstButton color="primary" class="bg-emerald-500 htw-p-2" @click="toggle">
    Toggle RTL
  </HstButton>
</template>

<script setup lang="ts">
import { useLanguageStore } from "../store";
const store = useLanguageStore();
const toggle = () => {
  if (store.isRtl) {
    store.setLanguage("English");
  } else {
    store.setLanguage("عربى");
  }
};
</script>
