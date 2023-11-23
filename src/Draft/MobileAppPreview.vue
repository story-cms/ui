<template>
  <div
    class="grid h-[844px] w-[407px] place-content-center bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22407%22%20height%3D%22844%22%20viewBox%3D%220%200%20407%20844%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%22375%22%20height%3D%22812%22%20transform%3D%22translate(16%2016)%22%20fill%3D%22%23EBE9DE%22%2F%3E%0A%3Cpath%20d%3D%22M99%2018.8408H309V30.6564C309%2041.7021%20300.046%2050.6564%20289%2050.6564H119C107.954%2050.6564%2099%2041.7021%2099%2030.6564V18.8408Z%22%20fill%3D%22black%22%2F%3E%0A%3Crect%20x%3D%229.5%22%20y%3D%229.5%22%20width%3D%22388%22%20height%3D%22825%22%20rx%3D%2258.5%22%20stroke%3D%22%23111827%22%20stroke-width%3D%2219%22%2F%3E%0A%3C%2Fsvg%3E%0A')]"
  >
    <div ref="flutterTarget" class="h-[730px] w-[350px] border transition-all"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

declare global {
  interface Window {
    _flutter: any;
    _appState: any;
  }
}

const flutterTarget = ref(null);
const props = defineProps({
  bundle: {
    type: Object,
    required: true,
  },
});

const loadEpisode = (bundle: any) => {
  const data = bundle;
  data['number'] = 1;
  window._appState.setEpisode(JSON.stringify(data));
};

watch(
  () => props.bundle,
  (newBundle, oldBundle) => {
    if (newBundle !== oldBundle) {
      loadEpisode(newBundle);
    }
  },
);

const flutterLoader = () => {
  const target = flutterTarget.value;
  if (!target) {
    throw new Error('Flutter target not found');
  }
  const _flutter: any = window._flutter || {};
  _flutter.loader.loadEntrypoint({
    onEntrypointLoaded: async (engineInitializer: any) => {
      const appRunner = await engineInitializer.initializeEngine({
        hostElement: target,
        assetBase: '/web/',
      });
      await appRunner.runApp();
      setTimeout(() => {
        loadEpisode(props.bundle);
      }, 1000);
    },
  });
};

onMounted(() => {
  flutterLoader();
});
</script>
