<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Rive } from '@rive-app/canvas';

export default defineComponent({
  name: 'Rive',
  props: {
    url: String,
  },
  mounted() {
    new Rive({
      canvas: this.$refs.canvas as HTMLCanvasElement,
      src: this.$props.url,
      autoplay: true,
    });
  },
});
</script>
