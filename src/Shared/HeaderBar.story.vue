<template>
  <Story title="Translation Navigation" group="shared">
    <Variant title="SingleStory SingleLanguage Editor" :setup-app="loadData">
      <HeaderBar />
    </Variant>
    <Variant title="MultiStory SingleLanguage Editor" :setup-app="loadData">
      <HeaderBar />
    </Variant>
    <Variant title="MultiStory MultiLanguage Editor" :setup-app="loadData">
      <HeaderBar />
    </Variant>
    <Variant title="MultiStory MultiLanguage Admin" :setup-app="loadData">
      <HeaderBar />
    </Variant>
    <Variant title="SingleStory MultiLanguage Editor" :setup-app="loadData">
      <HeaderBar />
    </Variant>
    <Variant title="SingleStory MultiLanguage Admin" :setup-app="loadData">
      <HeaderBar />
    </Variant>
    <Variant title="SingleStory SingleLanguage Admin" :setup-app="loadData">
      <HeaderBar />
    </Variant>
    <Variant title="MultiStory SingleLanguage Admin" :setup-app="loadData">
      <HeaderBar />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar.vue';
import { LanguageSpecification } from 'src/Shared/interfaces';
import { useSharedStore } from '../store';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { sharedProps, meta } from '../helpers/mocks';

import { useForm } from '@inertiajs/vue3';
const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const shared = useSharedStore();

  shared.setFromProps(sharedProps);

  if (variant?.title == 'SingleStory SingleLanguage Editor') {
    shared.meta = meta;
    shared.languages = [
      {
        locale: 'en',
        language: 'English',
        languageDirection: 'ltr',
      },
    ];
    shared.stories = ['John'];
    shared.user.isAdmin = false;
    shared.user.isManager = false;
    shared.user.role = 'admin';
    shared.user.language = '*';
  }
  if (variant?.title == 'MultiStory SingleLanguage Editor') {
    shared.meta = meta;
    shared.languages = [
      {
        locale: 'en',
        language: 'English',
        languageDirection: 'ltr',
      },
    ];
    shared.user.isAdmin = false;
    shared.user.isManager = false;
    shared.user.role = 'admin';
    shared.user.language = '*';
  }
  if (variant?.title == 'MultiStory MultiLanguage Editor') {
    shared.meta = meta;
    shared.user.isAdmin = false;
    shared.user.isManager = false;
    shared.user.role = 'admin';
    shared.user.language = '*';
  }

  if (variant?.title == 'MultiStory MultiLanguage Admin') {
    shared.meta = meta;
    shared.user.isAdmin = true;
    shared.user.isManager = true;
    shared.user.role = 'admin';
    shared.user.language = '*';
  }
  if (variant?.title == 'SingleStory MultiLanguage Editor') {
    shared.meta = meta;
    shared.stories = ['John'];
    shared.user.isAdmin = false;
    shared.user.isManager = false;
    shared.user.role = 'editor';
    shared.user.language = '*';
  }

  if (variant?.title == 'SingleStory MultiLanguage Admin') {
    shared.meta = meta;
    shared.stories = ['John'];
    shared.user.isAdmin = true;
    shared.user.isManager = true;
    shared.user.role = 'admin';
    shared.user.language = '*';
  }
  if (variant?.title == 'SingleStory SingleLanguage Admin') {
    shared.meta = meta;
    shared.languages = [
      {
        locale: 'en',
        language: 'English',
        languageDirection: 'ltr',
      },
    ];
    shared.stories = ['John'];
    shared.user.isAdmin = true;
    shared.user.isManager = false;
    shared.user.role = 'admin';
    shared.user.language = '*';
  }

  if (variant?.title == 'MultiStory SingleLanguage Admin') {
    shared.meta = meta;
    shared.languages = [
      {
        locale: 'en',
        language: 'English',
        languageDirection: 'ltr',
      },
    ];
    shared.user.isAdmin = true;
    shared.user.isManager = true;
    shared.user.role = 'admin';
    shared.user.language = '*';
  }
  if (variant?.title == 'Admin All') {
    shared.meta = meta;
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
