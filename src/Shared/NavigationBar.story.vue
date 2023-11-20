<template>
  <Story title="Navigation Bar" group="shared">
    <Variant title="Editor English" :setup-app="loadData">
      <NavigationBar />
    </Variant>
    <Variant title="Admin English" :setup-app="loadData">
      <NavigationBar />
    </Variant>
    <Variant title="Editor All" :setup-app="loadData">
      <NavigationBar />
    </Variant>
    <Variant title="Admin All" :setup-app="loadData">
      <NavigationBar />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import NavigationBar from './NavigationBar.vue';
import { LanguageSpecification } from 'src/Shared/interfaces';
import { useSharedStore } from '../store';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { sharedProps, meta, bioyMeta, alMassiraMeta } from '../helpers/mocks';

import { useForm } from '@inertiajs/vue3';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const shared = useSharedStore();

  shared.setFromProps(sharedProps);
  // shared.meta.logo =
  //   'https://res.cloudinary.com/theword121/image/upload/v1687245360/episodes/viseg2hegowcrapio6pt.svg';
  // shared.meta.name = 'CMS UI';

  if (variant?.title == 'Editor English') {
    shared.meta = alMassiraMeta;
    shared.user.isAdmin = false;
    shared.user.isManager = false;
    shared.user.role = 'editor';
    shared.user.language = 'en';
  }
  if (variant?.title == 'Admin English') {
    shared.user.isAdmin = false;
    shared.user.isManager = false;
    shared.user.role = 'admin';
    shared.user.language = 'en';
  }
  if (variant?.title == 'Editor All') {
    shared.meta = bioyMeta;
    shared.user.isAdmin = false;
    shared.user.isManager = true;
    shared.user.role = 'editor';
    shared.user.language = 'en';
  }
  if (variant?.title == 'Admin All') {
    shared.meta = bioyMeta;
    shared.user.isAdmin = true;
    shared.user.isManager = true;
    shared.user.role = 'admin';
    shared.user.language = '*';
  }

  interface Form {
    language: string | null;
    story: string | null;
  }

  const form = useForm({
    language: shared.language.language,
    story: null,
  } as Form);
};
const language: LanguageSpecification = {
  locale: 'es',
  language: 'Espanol',
  languageDirection: 'ltr',
};
</script>
