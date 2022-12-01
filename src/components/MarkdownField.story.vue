<template>
  <Story title="Markdown Field" group="widgets">
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
<docs lang="md">
# Markdown Field

## Props

**modelValue**
This is the model value

type: String,
required: true

**field**
Data for this field
type: Object as PropType<FieldSpec>
required: true,

**error**
The error message
type: Object,
required: false,

**isNested**
Indicates whether this is a nested widget or not
type: Boolean,
default: false,

## Emits

modelValue is emited on the Easy Markdown Editor change
</docs>

<script setup lang="ts">
import { ref } from "vue";
import MarkdownField from "./MarkdownField.vue";
const notes = ref(
  "# The Outing\nWe went to the park at *09h00* on a **sunny** day.",
);
</script>
