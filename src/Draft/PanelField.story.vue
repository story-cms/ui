<template>
  <Story title="PanelField">
    <Variant title="Default" :setup-app="loadData">
      <PanelField :field="spec" />
      <ModelControl :model="panelModel" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <PanelField :field="spec" />
      <template #controls>
        <ErrorControl :errors="panelErrors" />
      </template>
    </Variant>

    <Variant title="Readonly Title" :setup-app="loadData">
      <PanelField :field="{ ...spec, fields: readOnlyTitle }" />
      <ModelControl :model="panelModel" />
    </Variant>

    <Variant title="No Label" :setup-app="loadData">
      <PanelField :field="noLabel" />
      <ModelControl :model="panelModel" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import PanelField from './PanelField.vue';
import ModelControl from '../helpers/ModelControl.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import { panelErrors, panelModel } from '../helpers/mocks';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  store.model = panelModel;
  if (variant?.title == 'Error') {
    store.errors = panelErrors;
  }
};

const spec = {
  label: 'Note',
  name: 'note',
  widget: 'panel',
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Description',
      name: 'description',
      widget: 'markdown',
    },
  ],
};

const readOnlyTitle = [
  {
    label: 'Title',
    name: 'title',
    widget: 'string',
    isReadOnly: true,
  },
  {
    label: 'Description',
    name: 'description',
    widget: 'markdown',
  },
];
const noLabel = {
  label: '',
  name: 'note',
  widget: 'panel',
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Description',
      name: 'description',
      widget: 'markdown',
    },
  ],
};
</script>
