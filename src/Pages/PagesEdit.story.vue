<template>
  <Story title="Edit Page" group="pages">
    <Variant title="Index">
      <PagesEdit
        :page="page"
        :bundle="{}"
        :providers="{}"
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
import PagesEdit from './PagesEdit.vue';
import { sharedProps } from '../helpers/mocks';
import { PageMeta } from 'src/Shared/interfaces';

const page: PageMeta = {
  id: 1,
  createdAt: '2023-10-10',
  updatedAt: '2023-10-11',
};
</script>
