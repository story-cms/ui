<template>
  <Story title="Markdown Field" id="markdown-field">
    <Variant title="Empty">
      <MarkdownField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'markdown',
          isReadonly: false,
        }"
        modelValue=""
        @update:modelValue="modelValue = $event"
      />
    </Variant>

    <Variant title="Populated">
      <MarkdownField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'markdown',
          isReadonly: false,
        }"
        modelValue="Johannes Kerkorrel"
        @update:modelValue="modelValue = $event"
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
        modelValue=""
        error="blah"
        @update:modelValue="modelValue = $event"
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
        modelValue="Johannes Kerkorrel"
        @update:modelValue="modelValue = $event"
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
<script setup>
import MarkdownField from "./MarkdownField.vue";
</script>
