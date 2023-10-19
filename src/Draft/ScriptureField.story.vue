<template>
  <Story title="Scripture Field" group="widgets">
    <Variant title="With data" :setup-app="loadData">
      <ScriptureField :field="scriptureSpec" />
      <ModelControl :model="scriptureModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Empty">
      <ScriptureField :field="scriptureSpec" />
      <ModelControl :model="scriptureModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="German" :setup-app="setGerman">
      <ScriptureField :field="scriptureSpec" />
      <ModelControl :model="scriptureModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="ReadOnly" :setup-app="loadData">
      <ScriptureField :field="scriptureSpec" :is-read-only="true" />
      <ModelControl :model="scriptureModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <ScriptureField :field="scriptureSpec" />
      <template #controls>
        <ErrorControl :errors="scriptureError" />
      </template>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ScriptureField from './ScriptureField.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import { scriptureSpec, scriptureModel } from '../helpers/mocks';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore, useLanguageStore } from '../store';

const scriptureError = {
  'bundle.scripture.verse': ['required validation failed'],
};
const setGerman: Vue3StorySetupHandler = () => {
  const lang = useLanguageStore();
  lang.setLanguage({
    locale: 'de',
    language: 'Deutsch',
    languageDirection: 'ltr',
    bibleVersion: 'f492a38d0e52db0f-01',
  });
};

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  store.model = scriptureModel;
  if (variant?.title == 'Error') {
    store.errors = scriptureError;
  }
};
</script>

<docs lang="md">
# Scripture Field
</docs>
