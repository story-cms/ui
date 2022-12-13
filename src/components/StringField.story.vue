<template>
  <Story title="String Field" group="widgets">
    <Variant title="With model">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: false,
        }"
      />
      <ModelControl :model="simpleModel" />
    </Variant>

    <Variant title="RTL">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: false,
        }"
      />
      <LanguageControl />
    </Variant>

    <Variant title="Error">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: false,
        }"
      />
      <ErrorControl :errors="simpleErrors" />
    </Variant>

    <Variant title="Readonly">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: true,
        }"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import StringField from "./StringField.vue";
import LanguageControl from "../helpers/LanguageControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import ModelControl from "../helpers/ModelControl.vue";
import { simpleErrors, simpleModel } from "../helpers/mocks";
</script>

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
