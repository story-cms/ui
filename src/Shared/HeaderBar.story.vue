<template>
  <Story title="Translation Navigation" group="shared">
    <Variant title="Stories">
      <HeaderBar
        :meta="meta"
        :language="spanish"
        :stories="['John', 'Acts']"
        story-name="Acts"
        :user="user"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar.vue';

import { meta, spanish, user } from '../helpers/mocks';
</script>
