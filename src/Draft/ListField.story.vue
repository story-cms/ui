<template>
  <Story title="ListField">
    <Variant title="Default" :setup-app="loadData">
      <ListField :field="listSpec" />
      <ModelControl :model="listModel" />
    </Variant>

    <Variant title="Foldable" :setup-app="loadData">
      <ListField :field="{ canFold: true, ...listSpec }" />
      <ModelControl :model="listModel" />
    </Variant>

    <Variant title="Load data">
      <ListField :field="{ canFold: true, ...listSpec }" />
      <ModelControl :model="listModel" :is-inspect-only="false" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <ListField :field="{ canFold: true, ...listSpec }" />
      <template #controls>
        <ErrorControl :errors="listErrors" />
      </template>
    </Variant>

    <Variant title="List in List" :setup-app="loadData">
      <ListField :field="listInListSpec" />
      <ModelControl :model="listInListModel" />
    </Variant>

    <Variant title="List in List Empty">
      <ListField :field="listInListSpec" />
      <ModelControl :model="listInListModel" :is-inspect-only="false" />
    </Variant>

    <Variant title="List in List Error" :setup-app="loadData">
      <ListField :field="listInListSpec" />
      <template #controls>
        <ErrorControl :errors="listInListErrors" />
      </template>
    </Variant>

    <Variant title="Poke" :setup-app="loadData">
      <ListField :field="pokeSpec" />
      <ModelControl :model="pokeModel" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

import ListField from './ListField.vue';
import ModelControl from '../helpers/ModelControl.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import {
  listSpec,
  listModel,
  listErrors,
  listInListModel,
  listInListSpec,
  listInListErrors,
} from '../helpers/mocks';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  switch (variant?.title) {
    case 'Error':
      store.errors = listErrors;
      store.model = listModel;
      break;
    case 'Foldable':
    case 'Default':
      store.model = listModel;
      break;
    case 'List in List Error':
      store.errors = listInListErrors;
      break;
    case 'List in List':
      store.model = listInListModel;
      break;
    case 'Poke':
      store.model = pokeModel;
      break;
    default:
      break;
  }
};

const pokeSpec = {
  label: 'Summary Statement',
  name: 'conclusions',
  widget: 'list',
  fields: [
    {
      label: 'Summary Statement',
      name: 'statement',
      widget: 'string',
    },
    {
      label: 'Scripture Excerpt',
      name: 'excerpt',
      widget: 'markdown',
      minimal: true,
      buttons: ['code'],
    },
  ],
};

const pokeModel = {
  conclusions: [
    {
      statement: 'This is a summary statement',
      excerpt: 'This is a scripture excerpt',
    },
    {
      statement: 'This is another summary statement',
      excerpt: 'This is another scripture excerpt',
    },
  ],
};
</script>
