<template>
  <div class="bg-white p-[32px] rounded border border-gray-100 shadow-sm">
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
import { computed, ref, nextTick } from "vue";
import { commonProps } from "../helpers/form-helpers";
import { FieldSpec, FieldMap } from "../interfaces";
import { widgetField } from "../helpers/widget-fields";

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
