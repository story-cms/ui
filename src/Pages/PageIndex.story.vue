<template>
  <Story title="Page Index" group="pages">
    <Variant title="With model" :setup-app="loadData">
      <PageIndex :user="{}" :pages="[]" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import PageIndex from './PageIndex.vue';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { usePagesStore } from '../store';

const loadData: Vue3StorySetupHandler = () => {
  const store = usePagesStore();
  store.setItems(pageItems);
};

const pageItems = [
  {
    id: 1,
    group: 1,
    title: 'About',
    icon: 'https://res.cloudinary.com/kiekies/image/upload/v1676554928/tmwckmf75hvnpabrifqn.svg',
    description: 'The Word One To One exists to help people meet Jesus in the Bible.',
    body: '# Who we are\n\nThe ministry started in 1997 when we discovered that people of all walks of life still find the Word of God so compelling that they will be',
    isPublished: true,
  },
  {
    id: 2,
    group: 1,
    title: 'Help',
    icon: 'https://res.cloudinary.com/kiekies/image/upload/v1676554928/tmwckmf75hvnpabrifqn.svg',
    description: 'Got questions? Find out how to make the most of your experience.',
    body: 'https://thewordonetoone.com/faq',
    isPublished: false,
  },
  {
    id: 3,
    group: 5,
    isDivider: true,
  },
  {
    id: 4,
    group: 2,
    title: 'Feedback',
    icon: 'https://res.cloudinary.com/kiekies/image/upload/v1676554928/tmwckmf75hvnpabrifqn.svg',
    description: 'Tell us about your experience and help us improve the app.',
    body: 'https://thewordonetoone.com/feedback',
    isPublished: true,
  },
  {
    id: 5,
    group: 6,
    isDivider: true,
  },
];
</script>
