<template>
  <div class="rounded border border-gray-100 bg-white p-[32px] shadow-sm">
    <div v-for="(item, index) in fields" :key="index">
      <component
        :is="widgetFor(index)"
        :field="item"
        :root-path="rootPath"
        :isNested="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { commonProps } from "../shared/helpers";
import { FieldSpec } from "App/Models/Interfaces";
import { widgetField } from "./widget-fields";

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);

const fields = field.value.fields as FieldSpec[];

const widgetFor = (key: number) => {
  const widget = (field.value.fields! as FieldSpec[])[key].widget;
  return widgetField(widget);
};
</script>
