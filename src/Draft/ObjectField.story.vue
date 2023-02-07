<template>
  <Story title="ObjectField">
    <Variant title="Default" :setup-app="loadData">
      <ObjectField :field="objectSpec" />
      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="Readonly" :setup-app="loadData">
      <ObjectField :field="objectSpec" :is-read-only="true" />
      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <ObjectField :field="objectSpec" />
      <template #controls>
        <ErrorControl :errors="objectErrors" />
      </template>
    </Variant>

    <Variant title="List in Object" :setup-app="loadData">
      <ObjectField :field="listInObjectSpec" />
      <ModelControl :model="listInObjectModel" />
    </Variant>

    <Variant title="List in Object Empty">
      <ObjectField :field="listInObjectSpec" />
      <ModelControl :model="listInObjectModel" />
    </Variant>

    <Variant title="List in Object Error" :setup-app="loadData">
      <ObjectField :field="listInObjectSpec" />
      <template #controls>
        <ErrorControl :errors="listInObjectError" />
      </template>
    </Variant>

    <Variant title="Object in List in Object" :setup-app="loadData">
      <ObjectField :field="objectInListInObjectSpec" />
      <ModelControl :model="objectInListInObjectModel" />
    </Variant>

    <Variant title="Object in List in Object Empty">
      <ObjectField :field="objectInListInObjectSpec" />
      <ModelControl :model="objectInListInObjectModel" />
    </Variant>

    <Variant title="Object in List in Object Error" :setup-app="loadData">
      <ObjectField :field="objectInListInObjectSpec" />
      <template #controls>
        <ErrorControl :errors="objectInListInObjectErrors" />
      </template>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';
import ObjectField from './ObjectField.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import {
  objectErrors,
  objectModel,
  objectSpec,
  listInObjectSpec,
  listInObjectModel,
  listInObjectError,
  objectInListInObjectSpec,
  objectInListInObjectModel,
  objectInListInObjectErrors,
} from '../helpers/mocks';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  switch (variant?.title) {
    case 'Error':
      store.errors = objectErrors;
      break;
    case 'Readonly':
    case 'Default':
      store.model = objectModel;
      break;

    case 'List in Object Error':
      store.errors = listInObjectError;
      break;
    case 'List in Object':
      store.model = listInObjectModel;
      break;

    case 'Object in List in Object Error':
      store.errors = objectInListInObjectErrors;
      break;
    case 'Object in List in Object':
      store.model = objectInListInObjectModel;
      break;

    default:
      break;
  }
};
</script>
