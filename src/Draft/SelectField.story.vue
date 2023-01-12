<template>
  <Story title="Select Field" group="widgets">
    <Variant title="With model" :setup-app="loadData">
      <SelectField :field="spec" />
      <ModelControl :model="objectModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Readonly" :setup-app="loadData">
      <SelectField
        :field="{
          name: 'airport-code',
          label: 'City',
          widget: 'select',
          options: [
            { label: 'Chicago', value: 'ORD' },
            { label: 'Paris', value: 'CDG' },
            { label: 'Tokyo', value: 'HND' },
          ],
          default: 'ORD',
          isReadOnly: true,
        }"
      />
    </Variant>

    <Variant title="RTL">
      <SelectField :field="spec" />
      <LanguageControl />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <SelectField :field="spec" />
      <template #controls>
        <ErrorControl :errors="objectErrors" />
      </template>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import SelectField from './SelectField.vue';
import LanguageControl from '../helpers/LanguageControl.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

const objectModel = {
  label: 'City',
  name: 'airport-code',
  widget: 'select',
  options: [
    { label: 'Chicago', value: 'ORD' },
    { label: 'Paris', value: 'CDG' },
    { label: 'Tokyo', value: 'HND' },
  ],
  default: 'ORD',
};

const objectErrors = {
  'bundle.airport-code': ['required validation failed'],
};

const loadData: Vue3StorySetupHandler = ({ app, story, variant }) => {
  const store = useModelStore();
  store.model = objectModel;
  if (variant?.title == 'Error') {
    store.errors = objectErrors;
  }
};

const spec = {
  name: 'airport-code',
  label: 'City',
  widget: 'select',
  options: [
    { label: 'Chicago', value: 'ORD' },
    { label: 'Paris', value: 'CDG' },
    { label: 'Tokyo', value: 'HND' },
  ],
  default: 'ORD',
};
</script>

<docs lang="md">
# Select Field
</docs>
