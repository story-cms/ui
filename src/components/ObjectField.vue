<template>
  <div
    class="my-[32px] bg-white p-[32px] rounded border border-gray-100 shadow-sm"
  >
    <div v-if="field.label">
      <label class="input-label mb-3">
        {{ field.label }}
      </label>
    </div>

    <div class="space-y-[24px]">
      <div v-for="key in Object.keys(field.fields!)" :key="key" class="">
        <component
          :is="dynamicPrimitive((field.fields! as FieldMap)[key].widget)"
          :field="(field.fields! as FieldMap)[key]"
          v-model="form[field.name][key]"
          :error="errors && errors[`bundle.${field.name}.${key}`]"
          :isNested="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { dynamicPrimitive } from "@/Helpers/formHelpers";
import { FieldSpec, FieldMap } from "@/Interfaces";
import Icon from "../shared/Icon.vue";
import StringField from "./StringField.vue";
import MarkdownField from "./MarkdownField.vue";

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
    // const fields = computed(() =>);
    return { dynamicPrimitive };
  },

  components: {
    MarkdownField,
    StringField,
    Icon,
  },
};
</script>
