<template>
  <div
    :class="{
      'rounded-bl-lg rounded-br-lg bg-white px-8 py-6 shadow-sm': !isNested,
      rtl: shared.isRtl,
    }"
  >
    <div class="flex items-center space-x-2" :class="{ 'space-x-reverse': spaceReverse }">
      <button
        type="button"
        :class="btnClass"
        class="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
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
        :class="{
          rtl: shared.isRtl,
          'order-first': labelStart,
        }"
      >
        {{ field.label }}
      </label>
    </div>

    <p v-if="hasError" class="mt-1 text-sm text-error">{{ errors[0] }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { FieldSpec } from '../Shared/interfaces';
import { useModelStore, useSharedStore } from '../store';
import { commonProps } from '../Shared/helpers';

const props = defineProps({
  ...commonProps,
});

const model = useModelStore();
const shared = useSharedStore();

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

if (!model.isPopulated(fieldPath.value)) {
  model.setField(fieldPath.value, field.value.default);
}

// toggle
const isOn = props.isReadOnly
  ? ref(Boolean(model.getSourceField(fieldPath.value, field.value.default)))
  : ref(Boolean(model.getField(fieldPath.value, field.value.default)));

const toggle = () => {
  if (props.isReadOnly) return;
  isOn.value = !isOn.value;
  model.setField(fieldPath.value, isOn.value);
};

model.$subscribe(() => {
  if (props.isReadOnly) return;

  nextTick().then(() => {
    isOn.value = Boolean(model.getField(fieldPath.value, field.value.default));
  });
});

// tint
const tintColor = computed(() => {
  return field.value.tintColor ? field.value.tintColor : 'indigo-600';
});

const btnClass = computed((): string => {
  const classes = isOn.value
    ? [`bg-${tintColor.value} focus:ring-${tintColor.value}`]
    : ['bg-gray-200 focus:ring-gray-200'];
  const cursor = props.isReadOnly ? 'cursor-default' : 'cursor-pointer';
  classes.push(cursor);
  return classes.join(' ');
});

// label order
const labelStart = computed((): boolean => field.value.labelOrder === 'start');
const spaceReverse = computed((): boolean => {
  if (labelStart.value && !shared.isRtl) return true;
  if (!labelStart.value && shared.isRtl) return true;
  return false;
});

const errors = computed(() => shared.errorMessages(fieldPath.value));
const hasError = computed(() => errors.value.length > 0 && !props.isReadOnly);
</script>
