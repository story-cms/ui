<template>
  <div ref="flutterTarget"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, PropType } from 'vue';

const flutterTarget = ref(null);
const props = defineProps({
  loadEpisode: Function as PropType<() => void>,
});

onMounted(() => {
  // Embed Flutter into the div with ref "flutterTarget"
  const target = flutterTarget.value;

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
