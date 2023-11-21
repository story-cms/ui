<template>
  <Story title="Meta Box" group="shared">
    <Variant title="Default" class="mt-4">
      <MetaBox
        :created-at="meta.createdAt"
        :updated-at="meta.updatedAt"
        :number="1"
        :story-type="'Story'"
        :chapter-type="'01 of 42'"
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
