<template>
  <Story title="Context Menu" group="shared">
    <Variant title="With options">
      <ContextMenu :options="options" />
    </Variant>
    <Variant title="Without options">
      <ContextMenu :options="noOptions" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ContextMenu from './ContextMenu.vue';
const options = ['Add', 'Edit', 'Delete'];
const noOptions: string[] = [];
</script>

<docs lang="md">
# Number Field
</docs>
