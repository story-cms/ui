<template>
  <h3 class="mt-6">Model</h3>
  <code>
    <pre class="m-4 text-green-500">{{ JSON.stringify(model, null, 2) }}</pre>
  </code>
</template>

<script lang="ts" setup>
const props = defineProps({
  model: Object,
});
</script>
