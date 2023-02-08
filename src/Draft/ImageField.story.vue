<template>
  <Story id="image-field" title="Image Field" group="widgets">
    <Variant title="With model">
      <ImageField :field="spec" />

      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="Empty with default preset">
      <ImageField
        :field="{
          name: 'profile',
          label: 'Profile Image',
          widget: 'image',
          provider: provider,
        }"
      />

      <ModelControl :model="objectModel" />
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
import { objectErrors, objectModel } from '../helpers/mocks';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  if (variant?.title == 'Read Only') {
    store.model = objectModel;
  }
  if (variant?.title == 'Error') {
    store.errors = objectErrors;
  }
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
</script>
