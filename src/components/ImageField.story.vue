<template>
  <Story title="Image Field" id="image-field" group="widgets">
    <Variant title="Empty">
      <ImageField
        :field="{
          name: 'graphic',
          label: 'Cover Image',
          widget: 'image',
          isReadonly: false,
          uploadPreset: 'cmsplayground',
          provider: {
            uploadPreset: 'cmsplayground',
            cloudName: 'onesheep',
            apiKey: config.apiKey,
            secret: config.secret,
          },
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
    <Variant title="Read Only">
      <ImageField
        :field="{
          name: 'name',
          label: 'Read only Image',
          widget: 'image',
          isReadonly: true,
        }"
        v-model="existing"
      />
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { config } from "../../secrets";
import ImageField from "./ImageField.vue";
const drawing = ref("");
const existing = ref(
  "https://res.cloudinary.com/onesheep/image/upload/v1669793982/cld-sample-2.jpg"
);
</script>
