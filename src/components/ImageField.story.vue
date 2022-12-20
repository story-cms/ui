<template>
  <Story title="Image Field" id="image-field" group="widgets">
    <Variant title="With model">
      <ImageField
        :field="{
          name: 'profile',
          label: 'Profile Image',
          widget: 'image',
          uploadPreset: 'cmsplayground',
          provider: {
            cloudinaryUploadPreset: 'cmsplayground',
            cloudinaryCloudName: 'onesheep',
            cloudinaryApiKey: config.cloudinaryApiKey,
            cloudinarySecret: config.cloudinarySecret,
          },
        }"
      />

      <ModelControl :model="simpleModel" />
    </Variant>

    <Variant title="Error">
      <ImageField
        :field="{
          name: 'profile',
          label: 'Profile Image',
          widget: 'image',
        }"
      />

      <ErrorControl :errors="simpleErrors" />
    </Variant>

    <Variant title="Read Only">
      <ImageField
        :field="{
          name: 'profile',
          label: 'Profile Image',
          widget: 'image',
          isReadOnly: true,
        }"
      />
      <ModelControl :model="simpleModel" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ImageField from "./ImageField.vue";
import LanguageControl from "../helpers/LanguageControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import config from "../../secrets";
import ModelControl from "../helpers/ModelControl.vue";
import { simpleErrors, simpleModel } from "../helpers/mocks";
</script>
