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
        v-model="season"
      />
    </Variant>

    <Variant title="Unbound">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: false,
        }"
      />
    </Variant>

    <Variant title="Error">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: false,
        }"
        :error="{}"
      />
    </Variant>

    <Variant title="Readonly">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: true,
        }"
        v-model="season"
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

<script setup lang="ts">
import { ref } from "vue";
import StringField from "./StringField.vue";
const season = ref("Spring");
</script>
