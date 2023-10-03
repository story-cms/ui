<template>
  <div ref="flutterTarget"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, PropType } from 'vue';

const flutterTarget = ref(null);
const props = defineProps({
  loadEpisode: {
    type: Function as PropType<() => void>,
    default: () => {
      return null;
    },
  },
});

onMounted(() => {
  const target = flutterTarget.value;
  if (!target) {
    throw new Error('Flutter target not found');
  }

  _flutter.loader.loadEntrypoint({
    onEntrypointLoaded: async (engineInitializer: any) => {
      const appRunner = await engineInitializer.initializeEngine({
        hostElement: target,
        assetBase: '/web/',
      });
      await appRunner.runApp();
      setTimeout(() => {
        props.loadEpisode();
      }, 1000);
    },
  });
});
</script>
