<template>
  <Story title="Meta Box" group="shared">
    <Variant title="Default">
      <MetaBox
        :created-at="meta.createdAt"
        :updated-at="meta.updatedAt"
        :story-type="'Story'"
        :chapter-type="'01 of 42'"
        :published-when="'2021-10-10T14:48:00.000000Z'"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import MetaBox from './MetaBox.vue';
const meta = {
  number: 1,
  createdAt: '2023-10-04 15:50:45.587+03',
  updatedAt: '2023-10-18 11:24:49.216+03',
};
</script>
