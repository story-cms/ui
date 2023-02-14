<template>
  <Story id="image-field" title="Image Field" group="widgets">
    <Variant title="Model with Image" :setup-app="loadData">
      <ImageField :field="spec" />
      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="Model without image" :setup-app="loadData">
      <ImageField :field="spec" />
      <ModelControl :model="objectModelBlankImage" />
    </Variant>

    <Variant title="Non Image Upload" :setup-app="loadData">
      <ImageField :field="nonImageSpec" />
      <ModelControl :model="objectModelBlankImage" />
    </Variant>

    <Variant title="Model with file attributes" :setup-app="loadData">
      <ImageField :field="fileAttributesSpec" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <ImageField
        :field="{
          name: 'profile',
          label: 'Profile Image',
          widget: 'image',
        }"
      />
      <template #controls>
        <ErrorControl :errors="objectErrors" />
      </template>
    </Variant>

    <Variant title="Read Only" :setup-app="loadData">
      <ImageField
        :field="{
          name: 'profile',
          label: 'Profile Image',
          widget: 'image',
        }"
        :is-read-only="true"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ImageField from './ImageField.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import { objectErrors, objectModel, objectModelBlankImage } from '../helpers/mocks';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  if (variant?.title == 'Read Only') {
    store.model = objectModel;
    return;
  }
  if (variant?.title == 'Model without image') {
    store.model = objectModelBlankImage;
    return;
  }
  if (variant?.title == 'Error') {
    store.errors = objectErrors;
    return;
  }
  store.model = objectModel;
};

const provider = {
  defaultPreset: 'cmsplayground',
  cloudName: 'onesheep',
};

const spec = {
  name: 'profile',
  label: 'Profile Image',
  widget: 'image',
  uploadPreset: 'cmsplayground',
  provider: provider,
};

const fileAttributesSpec = {
  name: 'avatar',
  label: 'Profile Image',
  widget: 'image',
  uploadPreset: 'cmsplayground',
  provider: provider,
  description: 'SVG, PNG up to 2MB',
  extensions: ['.svg', '.png'],
  maxSize: 2000000,
};

const nonImageSpec = {
  name: 'avatar',
  label: 'Profile Image',
  widget: 'image',
  uploadPreset: 'cmsplayground',
  provider: provider,
  description: 'RIV only',
  extensions: ['.riv'],
  maxSize: 2000000,
};
</script>
