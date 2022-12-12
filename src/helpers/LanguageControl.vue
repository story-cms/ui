<template>
  <div>
    <h3 class="mt-6">Direction state</h3>
    <code>
      <pre class="my-4 text-emerald-500">{{ store.languageDirection }}</pre>
    </code>
    <HstButton color="primary" class="bg-emerald-500 htw-p-2" @click="toggle">
      Toggle RTL
    </HstButton>
  </div>
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
