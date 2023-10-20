<template>
  <Story title="Translation Page" group="draft">
    <Variant title="Index" :setup-app="loadData">
      <TranslationIndex
        :draft="draft"
        :bundle="{}"
        :fields="fields"
        :spec="{
          chapterLimit: 21,
          hasEditReview: true,
          hasAppPreview: false,
          fields: fields,
        }"
        :last-published="'undefined'"
        :feedback="'undefined'"
        :providers="{}"
        :meta="meta"
        :user="user"
        story-name="Acts"
        :stories="['John', 'Acts']"
        :language="language"
        :errors="{}"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useConfigStore } from '../store';
import TranslationIndex from './TranslationIndex.vue';
import { story, stories, user, meta } from '../helpers/mocks';
import { LanguageSpecification } from 'src/Shared/interfaces';

const fields = [
  { name: 'title', label: 'Title', widget: 'string' },
  { name: 'description', label: 'Description', widget: 'string' },
  { name: 'image', label: 'Image', widget: 'image' },
  { name: 'body', label: 'Body', widget: 'markdown' },
  { name: 'title', label: 'Title', widget: 'string' },
  { name: 'description', label: 'Description', widget: 'string' },
  { name: 'image', label: 'Image', widget: 'image' },
  { name: 'body', label: 'Body', widget: 'markdown' },
];

const language: LanguageSpecification = {
  locale: 'es',
  language: 'Espanol',
  languageDirection: 'ltr',
};

const draft = {
  id: 1,
  number: 1,
  status: 'draft',
  updated_at: '2021-08-10T14:48:00.000000Z',
  created_at: '2021-08-10T14:48:00.000000Z',
};

const loadData: Vue3StorySetupHandler = () => {
  const store = useConfigStore();
  store.setStory(story);
  store.setStories(stories);
};
</script>
