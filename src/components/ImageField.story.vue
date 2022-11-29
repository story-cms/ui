<template>
  <Story title="Image Field" id="image-field">
    <Variant title="Empty">
      <ImageField
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
    <Variant title="Error">
      <ImageField
        :field="{
          name: 'name',
          widget: 'markdown',
          isReadonly: false,
        }"
        error="blah"
        modelValue=""
        @update:modelValue="modelValue = $event"
      />
    </Variant>
  </Story>
</template>
<script setup>
import ImageField from "./ImageField.vue";
</script>
