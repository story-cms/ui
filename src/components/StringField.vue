<template>
  <div
    :class="{
      'bg-white px-8 py-6 rounded-bl-lg rounded-br-lg shadow-sm': !isNested,
      rtl: store.isRtl,
    }"
  >
    <label :for="field.label" class="input-label">
      {{ field.label }}
    </label>
    <div class="mt-[2px] sm:mt-0 sm:col-span-2 pt-1">
      <input
        type="text"
        :name="field.label"
        :id="field.name"
        :readonly="field.isReadonly"
        autocomplete="given-name"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event!.target as HTMLInputElement).value)
        "
        class="input-field"
        :class="{ 'border-red-300': error, 'opacity-50': field.isReadonly }"
      />
      <p class="text-sm text-red-500" v-if="error"
        >This field cannot be empty</p
      >
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, inject } from "vue";
import { FieldSpec } from "../interfaces";
import { useLanguageStore } from "../store";

export default {
  props: {
    field: {
      type: Object as PropType<FieldSpec>,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    error: {
      type: Object,
      required: false,
    },
    isNested: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useLanguageStore();

    return { store };
  },
};
</script>
