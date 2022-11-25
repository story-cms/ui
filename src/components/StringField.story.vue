<template>
  <Story title="String Field">
    <Variant title="Empty">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          type: 'string',
          isReadonly: false,
        }"
        modelValue=""
        @update:modelValue="modelValue = $event"
      />
    </Variant>

    <Variant title="Populated">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          type: 'string',
          isReadonly: false,
        }"
        modelValue="Johannes Kerkorrel"
        @update:modelValue="modelValue = $event"
      />
    </Variant>

    <Variant title="Error">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          type: 'string',
          isReadonly: false,
        }"
        modelValue=""
        error="blah"
        @update:modelValue="modelValue = $event"
      />
    </Variant>

    <Variant title="Readonly">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          type: 'string',
          isReadonly: true,
        }"
        modelValue="Johannes Kerkorrel"
        @update:modelValue="modelValue = $event"
      />
    </Variant>
  </Story>
</template>
<docs lang="md">
# String Field

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

modelValue is emited on string field input
</docs>
<script setup>
import StringField from "./StringField.vue";
</script>
