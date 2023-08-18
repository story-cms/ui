<template>
  <Story title="Drop Down" group="shared">
    <Variant title="With options">
      <DropDown v-model="model" :options="options" @change="onSet" />
    </Variant>
    <Variant title="Read only">
      <DropDown v-model="model" :options="options" :is-read-only="true" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import DropDown from './DropDown.vue';
import { ref } from 'vue';

const options = ['Add', 'Edit', 'Delete'];
const model = ref('Edit');

const onSet = async (val: string) => {
  model.value = val;
  console.log(model.value);
};
</script>
