<template>
  <Story title="String Field" group="widgets">
    <Variant title="With model" :setup-app="loadData">
      <StringField :field="spec" />
      <ModelControl :model="objectModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <StringField :field="spec" />
      <template #controls>
        <ErrorControl :errors="objectErrors" />
      </template>
    </Variant>

    <Variant title="RTL">
      <StringField :field="spec" />
      <LanguageControl />
    </Variant>

    <Variant title="Readonly" :setup-app="loadData">
      <StringField :field="spec" :is-read-only="true" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import StringField from './StringField.vue';
import LanguageControl from '../helpers/LanguageControl.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import { objectErrors, objectModel, emptyModel } from '../helpers/mocks';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  store.model = objectModel;
  if (variant?.title == 'Error') {
    store.errors = objectErrors;
  }
  if (variant?.title == 'Readonly') {
    store.setSource({
      ...emptyModel,
      name: 'Kalvin Kiptum',
    });
  }
};

const spec = {
  name: 'name',
  label: 'Name',
  widget: 'string',
};
</script>

<docs lang="md">
# String Field
</docs>
