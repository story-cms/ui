<template>
  <div
    :class="{
      'rounded border border-gray-200 bg-white p-8 shadow': !isNested,
      'mt-4': isNested,
      rtl: language.isRtl,
    }"
  >
    <div class="flex flex-col">
      <label
        :for="fieldPath"
        class="input-label mr-2 mt-1"
        :class="{ rtl: language.isRtl, 'text-gray-600': isReadOnly }"
      >
        {{ field.label }}
      </label>
      <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
      <select
        :id="fieldPath"
        v-model="selection"
        name="select"
        :disabled="props.isReadOnly"
        class="max-w-min rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        :class="{ 'border-red-500': hasError, 'text-gray-600': props.isReadOnly }"
        @change="update"
      >
        <option v-for="{ value, label } in field.options" :key="value" :value="value">
          {{ label }}
        </option>
      </select>

      <p v-if="hasError" class="text-sm text-error">{{ errors[0] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import type { FieldSpec } from '../Shared/interfaces';
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
if (!model.isPopulated(fieldPath.value)) {
  model.setField(fieldPath.value, field.value.default);
}
const selection = props.isReadOnly
  ? ref(model.getSourceField(fieldPath.value, field.value.default))
  : ref(model.getField(fieldPath.value, field.value.default));

model.$subscribe(() => {
  nextTick().then(() => {
    selection.value = model.getField(fieldPath.value, field.value.default);
  });
});

const update = () => {
  model.setField(fieldPath.value, selection.value);
};

const errors = computed(() => model.errorMessages(fieldPath.value));
const hasError = computed(() => errors.value.length > 0);

const language = useLanguageStore();
</script>
