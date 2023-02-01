<template>
  <div class="rounded border border-gray-100 bg-white p-[32px] shadow-sm">
    <div class="relative flex justify-center">
      <button
        v-if="field.label && field.label.trim() !== ''"
        type="button"
        class="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span>{{ field.label }}</span>
      </button>
    </div>

    <div v-for="(item, index) in fields" :key="index">
      <component
        :is="widgetFor(index)"
        :field="item"
        :root-path="rootPath"
        :is-nested="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { commonProps } from '../Shared/helpers';
import { FieldSpec } from 'App/Models/Interfaces';
import { widgetField } from './widget-fields';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fields = field.value.fields as FieldSpec[];

const widgetFor = (key: number) => {
  const widget = (field.value.fields as FieldSpec[])[key].widget;
  return widgetField(widget);
};
</script>
