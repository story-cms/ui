<template>
  <Story title="Translation Navigation" group="shared">
    <Variant title="Stories">
      <TranslationNavigation
        :meta="meta"
        :story="story"
        :stories="stories"
        :user="user"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import TranslationNavigation from './TranslationNavigation.vue';

import { meta, story, stories, user } from '../helpers/mocks';
</script>
