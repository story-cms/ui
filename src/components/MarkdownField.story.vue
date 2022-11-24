<template>
  <Story title="Markdown Field">
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

<script setup>
import MarkdownField from "./MarkdownField.vue";
</script>
