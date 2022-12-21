<template>
  <div
    class="my-[32px] rounded border border-gray-100 bg-white p-[32px] shadow-sm"
  >
    <div v-if="field.label">
      <label class="input-label mb-3">
        {{ field.label }}
      </label>
    </div>

    <div class="space-y-[24px]">
      <div v-for="key in Object.keys(field.fields!)" :key="key" class="">
        <component
          :is="widgetFor(key)"
          :field="spec(key)"
          :root-path="fieldPath"
          :is-nested="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { commonProps } from "../Shared/helpers";
import type { FieldSpec } from "App/Models/Interfaces";
import { widgetField } from "./widget-fields";

interface FieldMap {
  [key: string]: FieldSpec;
}

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);

const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const widgetFor = (key: string) => {
  const widget = (field.value.fields! as FieldMap)[key].widget;
  return widgetField(widget);
};

const spec = (key: string): FieldSpec => {
  return (field.value.fields! as FieldMap)[key];
};
</script>
