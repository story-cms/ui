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
        class="input-label mt-1 mr-2"
        :class="{ rtl: language.isRtl }"
      >
        {{ field.label }}
      </label>
      <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
      <select
        name="select"
        :id="fieldPath"
        v-model="selection"
        @change="update"
        :disabled="props.isReadOnly"
        class="max-w-min rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        :class="{ 'border-red-500': hasError }"
      >
        <option v-for="{ value, label } in field.options" :value="value">
          {{ label }}
        </option>
      </select>

      <p class="text-sm text-error" v-if="hasError">This field cannot be empty</p>
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
const selection = ref(model.getField(fieldPath.value, field.value.default));

model.$subscribe(() => {
  nextTick().then(() => {
    selection.value = model.getField(fieldPath.value, field.value.default);
  });
});

const update = (event: Event) => {
  model.setField(fieldPath.value, selection.value);
};

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const language = useLanguageStore();
</script>
