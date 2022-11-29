<template>
  <Story title="Image Field" id="image-field">
    <Variant title="Empty">
      <ImageField
        :field="{
          name: 'graphic',
          label: 'Cover Image',
          widget: 'image',
          isReadonly: false,
        }"
        v-model="drawing"
      />
    </Variant>
    <Variant title="Error">
      <ImageField
        :field="{
          name: 'name',
          label: 'Error image',
          widget: 'image',
          isReadonly: false,
        }"
        :error="{}"
        v-model="drawing"
      />
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { ref } from "vue";

import ImageField from "./ImageField.vue";
const drawing = ref("");
</script>
