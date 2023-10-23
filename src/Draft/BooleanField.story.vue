<template>
  <Story title="Boolean Field" group="widgets">
    <Variant title="With model" :setup-app="loadData">
      <BooleanField :field="spec" />
      <ModelControl :model="objectModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Without start value" :setup-app="loadEmptyData">
      <BooleanField :field="spec" />
      <ModelControl :model="objectModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Special tint" :setup-app="loadData">
      <BooleanField :field="{ ...spec, tintColor: 'green-400' }" />
      <ModelControl :model="objectModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Label start" :setup-app="loadData">
      <BooleanField :field="{ ...spec, labelOrder: 'start' }" />
      <ModelControl :model="objectModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <BooleanField :field="spec" />
      <template #controls>
        <ErrorControl :errors="objectErrors" />
      </template>
    </Variant>

    <Variant title="RTL">
      <BooleanField :field="spec" />
      <LanguageControl />
    </Variant>

    <Variant title="Readonly" :setup-app="loadData">
      <BooleanField
        :field="{
          name: 'isFavourite',
          label: 'Is Favourite',
          widget: 'boolean',
          default: true,
        }"
        :is-read-only="true"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import BooleanField from './BooleanField.vue';
import LanguageControl from '../helpers/LanguageControl.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

const objectModel = {
  isFavourite: true,
};

const objectErrors = {
  'bundle.isFavourite': ['required validation failed'],
};

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  store.model = objectModel;
  if (variant?.title == 'Error') {
    store.errors = objectErrors;
  }
  if (variant?.title === 'Readonly') {
    store.setSource({
      isFavourite: false,
    });
  }
};

const loadEmptyData: Vue3StorySetupHandler = () => {
  const store = useModelStore();
  store.model = { name: 'Isaac Newton' };
};

const spec = {
  name: 'isFavourite',
  label: 'Is Favourite',
  widget: 'boolean',
  default: false,
};
</script>

<docs lang="md">
# Boolean Field
</docs>
