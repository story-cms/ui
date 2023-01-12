<template>
  <div
    :class="{
      'rounded-bl-lg rounded-br-lg bg-white px-8 py-6 shadow-sm': !isNested,
      rtl: language.isRtl,
    }"
  >
    <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
    <div
      class="flex items-center space-x-2"
      :class="{ 'space-x-reverse': language.isRtl }"
    >
      <button
        type="button"
        :class="{ 'bg-indigo-600': isOn, 'bg-gray-200': !isOn }"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        role="switch"
        aria-checked="false"
        :disabled="field.isReadOnly"
        @click="toggle"
      >
        <span class="sr-only">{{ field.label }}</span>
        <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
        <span
          aria-hidden="true"
          :class="{ 'translate-x-5': isOn, 'translate-x-0': !isOn }"
          class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        ></span>
      </button>

      <label
        :for="field.label"
        class="input-label mt-1"
        :class="{ rtl: language.isRtl }"
      >
        {{ field.label }}
      </label>
    </div>

    <p class="mt-1 text-sm text-error" v-if="hasError">
      This field cannot be empty
    </p>
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
const isOn = ref(model.getField(fieldPath.value, field.value.default || false));

const toggle = () => {
  isOn.value = !isOn.value;
  model.setField(fieldPath.value, isOn.value);
};

model.$subscribe(() => {
  nextTick().then(() => {
    isOn.value = model.getField(fieldPath.value, field.value.default || false);
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const language = useLanguageStore();
</script>