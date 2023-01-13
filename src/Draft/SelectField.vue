<template>
  <div
    :class="{
      'rounded-bl-lg rounded-br-lg bg-white px-8 py-6 shadow-sm': !isNested,
      rtl: language.isRtl,
    }"
  >
    <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
    <select
      name="select"
      id="select"
      @change="update"
      :disabled="field.isReadOnly"
      class="w-half mr-2 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      :class="{ 'border-red-500': hasError }"
    >
      <option v-for="selectObject in field.options">
        {{ selectObject.label }}
      </option>
    </select>

    <label :for="field.label" class="input-label mt-1" :class="{ rtl: language.isRtl }">
      {{ field.label }}
    </label>

    <p class="text-sm text-error" v-if="hasError">This field cannot be empty</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from 'vue';
import { FieldSpec } from 'App/Models/Interfaces';
import { useLanguageStore, useModelStore } from '../store';
import { commonProps } from '../shared/helpers';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const isOn = ref(model.getField(fieldPath.value, field.value.default || false));

model.$subscribe(() => {
  nextTick().then(() => {
    isOn.value = model.getField(fieldPath.value, field.value.default || false);
  });
});

onMounted(async () => {
  model.setField(fieldPath.value, field.value.default);
});

const update = (event: Event) => {
  model.setField(fieldPath.value, (event.target as HTMLInputElement).value);
};

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const language = useLanguageStore();
</script>
