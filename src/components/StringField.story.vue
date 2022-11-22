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

<script setup>
import StringField from "./StringField.vue";
</script>
