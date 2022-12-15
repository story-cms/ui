<template>
  <div
    :class="{
      'bg-white px-8 py-6 rounded-bl-lg rounded-br-lg shadow-sm': !isNested,
      rtl: language.isRtl,
    }"
  >
    <label :for="field.label" class="input-label">
      {{ field.label }}
    </label>
    <div class="mt-[2px] sm:mt-0 sm:col-span-2 pt-1">
      <input
        type="text"
        :name="field.label"
        :readonly="field.isReadonly"
        autocomplete="given-name"
        :value="modelValue"
        @input="update"
        class="input-field"
        :class="{ 'border-red-300': hasError, 'opacity-50': field.isReadonly }"
      />
      <p class="text-sm text-red-500" v-if="hasError"
        >This field cannot be empty</p
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import { FieldSpec } from "../interfaces";
import { useLanguageStore, useModelStore } from "../store";
import { commonProps } from "../helpers/form-helpers";

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

console.log(fieldPath.value);

const model = useModelStore();
const modelValue = ref(model.getField(fieldPath.value, ""));
const update = (event: Event) => {
  model.setField(fieldPath.value, (event.target as HTMLInputElement).value);
};

model.$subscribe(() => {
  nextTick().then(() => {
    modelValue.value = model.getField(fieldPath.value, "");
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);
const language = useLanguageStore();
</script>
