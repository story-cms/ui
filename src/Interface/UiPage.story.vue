<template>
  <Story title="Ui Page" group="interface">
    <Variant title="Index">
      <UiPage
        :items="items"
        :errors="sharedProps.errors"
        :language="sharedProps.language"
        :languages="sharedProps.languages"
        :meta="sharedProps.meta"
        :user="sharedProps.user"
        :stories="['John', 'Acts']"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import UiPage from './UiPage.vue';
import { sharedProps } from '../helpers/mocks';

const items = [
  {
    key: 'onBoardTitle',
    source: 'Welcome to the App',
    translation: 'Bienvenido a la aplicación',
    description: 'The title of the onboarding screen',
  },
  {
    key: 'onBoardDescription',
    source: 'This is the description of the onboarding screen',
    translation: 'Esta es la descripción de la pantalla de incorporación',
    description: 'The description of the onboarding screen',
  },
  {
    key: 'onBoardCTA',
    source: 'Get Started',
    translation: '',
  },
];
</script>
