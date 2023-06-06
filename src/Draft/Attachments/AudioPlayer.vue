<template>
  <audio v-if="url != null" controls>
    <source :src="url" type="audio/mpeg" />
  </audio>
</template>

<script setup lang="ts">
defineProps({
  url: String,
});
</script>
