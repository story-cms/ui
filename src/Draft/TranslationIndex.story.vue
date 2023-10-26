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
        :secrets="{}"
        :source="source"
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
  {
    name: 'nested',
    label: 'Nested',
    widget: 'object',
    fields: [
      { name: 'title', label: 'Title', widget: 'string' },
      { name: 'description', label: 'Description', widget: 'string' },
      { name: 'image', label: 'Image', widget: 'image' },
      { name: 'body', label: 'Body', widget: 'markdown' },
    ],
  },
];

const source = {
  title: 'The Word Became Flesh',
  description: 'We will look at the first chapter of the book of John.',
  image: 'https://source.unsplash.com/random/800x600',
  body: '## The Word Became Flesh\n\nIn the beginning was the Word, and the Word was with God, and the Word was God. He was with God in the beginning. Through him all things were made; without him nothing was made that has been made. In him was life, and that life was the light of all mankind. The light shines in the darkness, and the darkness has not overcome it.',
  nested: {
    title: 'Verse 1 - 3',
    description: 'The first three verses',
    image: 'https://source.unsplash.com/random/800x600',
    body: 'A *lot* less things ...',
  },
};

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
