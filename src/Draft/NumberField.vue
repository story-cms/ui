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
        v-model="modelValue"
        type="number"
        :readonly="props.isReadOnly"
        class="input-field w-24"
        :class="{ 'border-error': hasError, 'opacity-50': props.isReadOnly }"
        @input="update"
      />
      <p v-if="hasError" class="text-sm text-error">Please enter a number</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { FieldSpec } from 'App/Models/Interfaces';
import { useLanguageStore, useModelStore } from '../store';
import { commonProps } from '../Shared/helpers';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const modelValue = ref(model.getField(fieldPath.value, field.value.default ?? ''));
if (!model.isPopulated(fieldPath.value)) {
  model.setField(fieldPath.value, field.value.default ?? '');
}

const update = () => model.setField(fieldPath.value, modelValue.value);

model.$subscribe(() => {
  modelValue.value = model.getField(fieldPath.value, '');
});

const isWeird = computed((): boolean => {
  if (typeof modelValue.value == 'string' && modelValue.value.length > 0) return true;
  return isNaN(modelValue.value);
});

const hasError = computed(
  () => `bundle.${fieldPath.value}` in model.errors || isWeird.value === true,
);
const language = useLanguageStore();
</script>