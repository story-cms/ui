<template>
  <Story title="PanelField" group="widgets">
    <Variant title="Default" :setup-app="loadData">
      <PanelField :field="spec" />
      <ModelControl :model="panelModel" />
    </Variant>

    <Variant title="Rows" :setup-app="loadData">
      <PanelField :field="isRowWithNoLabel" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <PanelField :field="spec" />
      <template #controls>
        <ErrorControl :errors="panelErrors" />
      </template>
    </Variant>

    <Variant title="Readonly" :setup-app="loadData">
      <PanelField :field="spec" :is-read-only="true" />
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
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore, useSharedStore } from '../store';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  const shared = useSharedStore();

  store.model = panelModel;
  if (variant?.title == 'Error') {
    shared.errors = panelErrors;
  }
  if (variant?.title == 'Readonly') {
    store.setSource({
      title: 'English Title',
      description: '# English Description',
    });
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

const isRowWithNoLabel = {
  label: '',
  name: 'note',
  widget: 'panel',
  isRow: true,
  fields: [
    {
      name: 'profile',
      label: 'Profile Image',
      widget: 'image',
    },
    {
      name: 'avatar',
      label: 'Avatar Image',
      widget: 'image',
    },
  ],
};

const panelModel = {
  title: 'John',
  description: '# Read about John',
};

const panelErrors = {
  'bundle.title': ['required validation failed'],
};
</script>
