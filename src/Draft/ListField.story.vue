<template>
  <Story title="ListField">
    <Variant title="Default" :setup-app="loadData">
      <ListField :field="listSpec" />
      <ModelControl :model="listModel" />
    </Variant>

    <Variant title="Load data">
      <ListField :field="listSpec" />
      <ModelControl :model="listModel" :is-inspect-only="false" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <ListField :field="listSpec" />
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
  </Story>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

import ListField from './ListField.vue';
import { FieldSpec } from '../interfaces';
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

const loadData: Vue3StorySetupHandler = ({ app, story, variant }) => {
  const store = useModelStore();
  switch (variant?.title) {
    case 'Error':
      store.errors = listErrors;
    case 'Default':
      store.model = listModel;
      break;

    case 'List in List Error':
      store.errors = listInListErrors;
    case 'List in List':
      store.model = listInListModel;
      break;
    default:
      break;
  }
};
</script>
