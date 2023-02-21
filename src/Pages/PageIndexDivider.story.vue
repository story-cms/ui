<template>
  <Story title="Page Index Divider" group="pages">
    <Variant title="With model">
      <PageIndexItem :is-divider="true" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import PageIndexItem from './PageIndexItem.vue';
</script>

<docs lang="md"></docs>
