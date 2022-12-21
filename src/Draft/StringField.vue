<template>
  <div
    :class="{
      'rounded-bl-lg rounded-br-lg bg-white px-8 py-6 shadow-sm': !isNested,
      rtl: language.isRtl,
    }"
  >
    <label :for="field.label" class="input-label">
      {{ field.label }}
    </label>
    <div class="mt-[2px] pt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        :name="field.label"
        :readonly="field.isReadOnly"
        autocomplete="given-name"
        :value="modelValue"
        @input="update"
        class="input-field"
        :class="{ 'border-error': hasError, 'opacity-50': field.isReadOnly }"
      />
      <p class="text-sm text-error" v-if="hasError">
        This field cannot be empty
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import { FieldSpec } from "App/Models/Interfaces";
import { useLanguageStore, useModelStore } from "../store";
import { commonProps } from "../Shared/helpers";

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

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
