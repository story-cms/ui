<template>
  <Story title="Select Field" group="widgets">
    <Variant title="With model" :setup-app="loadData">
      <SelectField :field="spec" />
      <ModelControl :model="objectModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="No model data">
      <SelectField :field="spec" />
      <ModelControl :model="objectModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Readonly" :setup-app="loadData">
      <SelectField :field="spec" :is-read-only="true" />
    </Variant>

    <Variant title="RTL">
      <SelectField :dir="isRtl ? 'rtl' : 'ltr'" :field="spec" />
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
import { computed } from 'vue';
import SelectField from './SelectField.vue';
import LanguageControl from '../helpers/LanguageControl.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore, useSharedStore } from '../store';

const isRtl = computed(() => {
  return useSharedStore().isRtl;
});

const objectModel = {
  name: 'Neil Shenvi',
  airport: 'TKY',
};

const objectErrors = {
  'bundle.airport': ['required validation failed'],
};

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  const shared = useSharedStore();

  store.model = objectModel;
  if (variant?.title == 'Error') {
    shared.errors = objectErrors;
  }

  if (variant?.title == 'Readonly') {
    store.setSource({
      ...objectModel,
      airport: 'CHG',
    });
  }
};

const spec = {
  name: 'airport',
  label: 'City',
  widget: 'select',
  options: [
    { label: 'Chicago', value: 'CHG' },
    { label: 'Paris', value: 'PRS' },
    { label: 'Tokyo', value: 'TKY' },
  ],
  default: 'PRS',
};
</script>

<docs lang="md">
# Select Field
</docs>
