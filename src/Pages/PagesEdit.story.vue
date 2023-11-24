<template>
  <Story title="Pages Edit" group="pages">
    <Variant title="With model">
      <PagesEdit
        :bundle="{}"
        :page="page"
        :errors="sharedProps.errors"
        :language="sharedProps.language"
        :languages="sharedProps.languages"
        :meta="sharedProps.meta"
        :providers="{}"
        :stories="['John', 'Acts']"
        :user="sharedProps.user"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import PagesEdit from './PagesEdit.vue';
import { PageMeta } from '../Shared/interfaces';
import { sharedProps } from '../helpers/mocks';

const page: PageMeta = {
  id: 1,
  createdAt: '2021-10-10T14:48:00.000000Z',
  updatedAt: '2021-10-10T14:48:00.000000Z',
};
</script>
