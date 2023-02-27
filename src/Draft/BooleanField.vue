<template>
  <div
    :class="{
      'rounded-bl-lg rounded-br-lg bg-white px-8 py-6 shadow-sm': !isNested,
      rtl: language.isRtl,
    }"
  >
    <div class="flex items-center space-x-2" :class="{ 'space-x-reverse': spaceReverse }">
      <button
        type="button"
        :class="btnClass"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
        role="switch"
        aria-checked="false"
        :disabled="props.isReadOnly"
        @click="toggle"
      >
        <span class="sr-only">{{ field.label }}</span>
        <span
          aria-hidden="true"
          :class="{ 'translate-x-5': isOn, 'translate-x-0': !isOn }"
          class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        ></span>
      </button>

      <label
        :for="field.label"
        class="input-label mt-1"
        :class="{ rtl: language.isRtl, 'order-first': labelStart }"
      >
        {{ field.label }}
      </label>
    </div>

    <p v-if="hasError" class="mt-1 text-sm text-error">This field cannot be empty</p>
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
if (!model.isPopulated(fieldPath.value)) {
  model.setField(fieldPath.value, field.value.default);
}

// toggle
const isOn = ref(Boolean(model.getField(fieldPath.value, field.value.default)));

const toggle = () => {
  if (props.isReadOnly) return;
  isOn.value = !isOn.value;
  model.setField(fieldPath.value, isOn.value);
};

model.$subscribe(() => {
  nextTick().then(() => {
    isOn.value = Boolean(model.getField(fieldPath.value, field.value.default));
  });
});

// tint
const tintColor = computed(() => {
  if (props.isReadOnly) return 'gray-200';
  return field.value.tintColor ? field.value.tintColor : 'indigo-600';
});

const btnClass = computed((): string => {
  const classes = isOn.value
    ? [`bg-${tintColor.value} focus:ring-${tintColor.value}`]
    : ['bg-gray-200 focus:ring-gray-200'];
  if (props.isReadOnly) classes.push('cursor-default');
  return classes.join(' ');
});

// label order
const labelStart = computed((): boolean => field.value.labelOrder === 'start');
const spaceReverse = computed((): boolean => {
  if (labelStart.value && !language.isRtl) return true;
  if (!labelStart.value && language.isRtl) return true;
  return false;
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const language = useLanguageStore();
</script>
