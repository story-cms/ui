<template>
  <audio v-if="url != null" controls>
    <source :src="url" type="audio/mpeg" />
  </audio>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  url: {
    type: null as unknown as PropType<string | null>,
    required: true,
  },
});
</script>
