<template>
  <Story title="Index Page" group="pages">
    <Variant title="Index">
      <PagesIndex
        :pages="pages"
        :errors="sharedProps.errors"
        :meta="sharedProps.meta"
        :user="sharedProps.user"
        :language="sharedProps.language"
        :languages="sharedProps.languages"
        :stories="['John', 'Acts']"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import PagesIndex from './PagesIndex.vue';
import { sharedProps } from '../helpers/mocks';
import { PageItem } from 'src/Shared/interfaces';

const pages: PageItem[] = [
  {
    id: 1,
    title: 'About Us',
    description: 'What we are all about',
    icon: 'https://res.cloudinary.com/onesheep/image/upload/v1684417825/cmsplayground/aatrg9bikextwwun4vb2.svg',
    body: '## About Us\n\nWe are a group of people who love Jesus and want to share his love with others.',
    isPublished: true,
    isDivider: false,
  },
];
</script>
