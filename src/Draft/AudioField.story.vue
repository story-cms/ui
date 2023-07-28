<template>
  <Story id="audio-field" title="Audio Field" group="widgets">
    <Variant title="Model with audio" :setup-app="loadData">
      <AudioField :field="spec" />
      <ModelControl :model="audioModelBlankAudio" />
    </Variant>

    <Variant title="Model without audio" :setup-app="loadData">
      <AudioField :field="spec" />
      <ModelControl :model="audioModelBlankAudio" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <AudioField :field="spec" />
      <template #controls>
        <ErrorControl :errors="audioObjectErrors" />
      </template>
    </Variant>

    <Variant title="Nested" :setup-app="loadData">
      <PanelField :field="nested" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import AudioField from './AudioField.vue';
import PanelField from './PanelField.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  if (variant?.title == 'Model with audio') {
    store.model = audioModel;
    return;
  }
  if (variant?.title == 'Model without audio') {
    store.model = audioModelBlankAudio;
    return;
  }
  if (variant?.title == 'Error') {
    store.errors = audioObjectErrors;
    return;
  }

  store.model = audioModel;
};

const provider = {
  defaultPreset: 'cmsplayground',
  cloudName: 'onesheep',
};

const spec = {
  name: 'soundtrack',
  description: 'WAV, MP3, OGG, AAC, WMA',
  label: 'Audio file',
  extensions: ['.wav', '.mp3', '.ogg', '.aac', '.wma', '.m4a'],
  widget: 'audio',
  uploadPreset: 'cmsplayground',
  provider: provider,
  maxSize: 50662310,
};

const nested = {
  widget: 'panel',
  name: 'wrapper',
  label: '',
  fields: [
    { widget: 'string', name: 'name', label: 'Name' },
    { widget: 'number', name: 'age', label: 'Age' },
    spec,
  ],
};

const audioModel = {
  name: 'John',
  age: 30,
  soundtrack: {
    url: 'https://res.cloudinary.com/onesheep/video/upload/v1684307104/cmsplayground/hnjxjo6jj4octprgqyvq.mp3',
    length: 16.39,
  },
};

const audioModelBlankAudio = {
  name: 'John',
  age: 30,
  soundtrack: { url: null, length: null },
};

const audioObjectErrors = {
  'bundle.name': ['required validation failed'],
  'bundle.soundtrack.url': ['required validation failed'],
};
</script>
