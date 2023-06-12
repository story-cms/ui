<template>
  <Story title="Drop Down" group="shared">
    <Variant title="With options">
      <DropDown :options="options" modelValue="Add" />
    </Variant>
    <Variant title="With options no value">
      <DropDown :options="options" />
    </Variant>
    <Variant title="Read only">
      <DropDown :options="options" :isReadOnly="isReadOnly" modelValue="Add" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import DropDown from './DropDown.vue';

const options = ['Add', 'Edit', 'Delete'];
const isReadOnly = true;
</script>
