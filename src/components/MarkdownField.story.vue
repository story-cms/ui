<template>
  <Story title="Markdown Field">
    <Variant title="With model">
      <MarkdownField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'markdown',
          isReadonly: false,
        }"
        v-model="notes"
      />
    </Variant>

    <Variant title="Unbound">
      <MarkdownField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'markdown',
          isReadonly: false,
        }"
      />
    </Variant>

    <Variant title="Error">
      <MarkdownField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'markdown',
          isReadonly: false,
        }"
        :error="{ message: 'No way!' }"
      />
    </Variant>

    <Variant title="Readonly">
      <MarkdownField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'markdown',
          isReadonly: true,
        }"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from "vue";

import MarkdownField from "./MarkdownField.vue";
const notes = ref(
  "# The Outing\nWe went to the park at *09h00* on a **sunny** day.",
);
</script>
