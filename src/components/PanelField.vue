<template>
  <div class="bg-white p-[32px] rounded border border-gray-100 shadow-sm">
    <div v-for="(listField, index) in field.fields" :key="index">
      <component
        :is="dynamicPrimitive(listField.widget)"
        :field="listField"
        v-model="form[listField.name]"
        :error="errors && errors[`bundle.${listField.name}`]"
        :isNested="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { dynamicPrimitive } from "../helpers/formHelpers";
import { FieldSpec } from "../interfaces";
import StringField from "./StringField.vue";
import MarkdownField from "./MarkdownField.vue";
import ImageField from "./ImageField.vue";

export default {
  props: {
    field: {
      type: Object as PropType<FieldSpec>,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      default: {},
    },
  },

  setup() {
    return {
      dynamicPrimitive,
    };
  },

  components: { StringField, MarkdownField, ImageField },
};
</script>
