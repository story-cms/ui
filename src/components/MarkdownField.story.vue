<template>
  <Story title="Markdown Field" group="widgets">
    <Variant title="With model">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
          isReadonly: false,
        }"
      />
      <ModelControl :model="simpleModel" />
    </Variant>

    <Variant title="RTL">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
          isReadonly: false,
        }"
      />
      <LanguageControl />
    </Variant>

    <Variant title="Error">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
          isReadonly: false,
        }"
      />
      <ErrorControl :errors="simpleErrors" />
    </Variant>

    <Variant title="Readonly">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
          isReadonly: true,
        }"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import MarkdownField from "./MarkdownField.vue";
import LanguageControl from "../helpers/LanguageControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import ModelControl from "../helpers/ModelControl.vue";
import { simpleErrors, simpleModel } from "../helpers/mocks";
</script>

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
