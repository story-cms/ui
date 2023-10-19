<template>
  <Story title="Translation App Layout" group="shared">
    <Variant title="Role Admin">
      <TranslationAppLayout
        :meta="meta"
        :story="story"
        :stories="stories"
        :user="user"
        :chapter-title="'John . 01 . God Came to Earth'"
        :has-edit-review="true"
        :draft-status="'submitted'"
      />
    </Variant>
    <Variant title="Role Editor">
      <TranslationAppLayout
        :meta="meta"
        :story="story"
        :stories="stories"
        :user="{
          name: 'John Doe',
          initials: 'JD',
          email: 'john@example.com',
          isManager: true,
          isAdmin: true,
          role: 'editor',
        }"
        :chapter-title="'John . 01 . God Came to Earth'"
        :has-edit-review="true"
        :draft-status="'submitted'"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import TranslationAppLayout from './TranslationAppLayout.vue';

import { meta, story, stories, user } from '../helpers/mocks';
</script>
