<template>
  <div
    :class="{
      'rounded border border-gray-200 bg-white p-8 drop-shadow-sm': !isNested,
      'mt-4': isNested,
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
        :readonly="props.isReadOnly"
        autocomplete="given-name"
        :value="modelValue"
        @input="update"
        class="input-field"
        :class="{ 'border-error': hasError, 'opacity-50': props.isReadOnly }"
      />
      <p class="text-sm text-error" v-if="hasError">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
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
const modelValue = ref(model.getField(fieldPath.value, ''));
const update = (event: Event) => {
  model.setField(fieldPath.value, (event.target as HTMLInputElement).value);
};

model.$subscribe(() => {
  nextTick().then(() => {
    modelValue.value = model.getField(fieldPath.value, '');
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);
const errorMessage = computed(() => {
  const path = `bundle.${fieldPath.value}`;
  if (!model.errors[path]) return '';
  if (model.errors[path].length === 0) return '';
  return model.errors[path][0];
});

const language = useLanguageStore();
</script>
