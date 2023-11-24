<template>
  <Story title="Users Page" group="users">
    <Variant title="Index">
      <UsersIndex
        :users="users"
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
import UsersIndex from './UsersIndex.vue';
import { sharedProps } from '../helpers/mocks';
import { UserMeta } from 'src/Shared/interfaces';

const users: UserMeta[] = [
  {
    id: 1,
    name: 'John',
    email: 'jcalvin@example.com',
    language: '*',
    role: 'admin',
  },
  {
    id: 2,
    name: 'John',
    email: 'jpiper@example.com',
    language: 'en',
    role: 'editor',
  },
];
</script>
