<template>
  <div class="space-y-[32px] bg-transparent py-8">
    <div
      v-for="(_listItem, index) in form[field.name]"
      :key="index"
      class="relative"
    >
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center">
          <button
            @click="toggle(index)"
            type="button"
            class="
              inline-flex
              items-center
              rounded-full
              border border-gray-300
              bg-white
              px-4
              py-1.5
              text-sm
              font-medium
              leading-5
              text-gray-700
              shadow-sm
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:ring-offset-2
            "
          >
            <icon
              v-if="!isExpanded(index)"
              name="chevron-down"
              class="icon mr-1"
              aria-hidden="true"
            />
            <icon
              v-else
              name="chevron-right"
              class="icon mr-1"
              aria-hidden="true"
            />
            <span>
              {{ field.label }} :
              {{ title(index) === "undefined" ? "New Section" : title(index) }}
            </span>
          </button>
          <div
            v-if="hasError(index)"
            class="absolute left-0 cursor-pointer text-accent-one"
            @click="toggle(index)"
          >
            <div class="rounded-full border bg-white p-2">
              <icon name="exclamation" class="h-10 w-10" />
            </div>
          </div>
          <div
            class="absolute right-0 cursor-pointer text-red-500"
            @click="
              $emit('removeFieldFromForm', $event, field.name, index),
                toggle(index)
            "
          >
            <div class="rounded-full border bg-white p-2">
              <icon name="trash" class="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!isExpanded(index)"
        class="
          relative
          mt-[32px]
          space-y-[24px]
          rounded
          border border-gray-100
          bg-white
          p-[32px]
          shadow-sm
        "
      >
        <div
          v-for="(listField, i) in field.fields"
          :key="field.name + `${i.toString()}`"
        >
          <component
            :is="dynamicPrimitive(listField.widget)"
            :field="listField"
            v-model="form[field.name][index][listField.name]"
            :error="
              errors &&
              errors[
                `bundle.${field.name}.${index.toString()}.${listField.name}`
              ]
            "
            :isNested="true"
          />
        </div>
      </div>
    </div>

    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center">
        <button
          @click="addSet"
          type="button"
          class="
            inline-flex
            items-center
            rounded-full
            border border-gray-300
            bg-white
            px-4
            py-1.5
            text-sm
            font-medium
            leading-5
            text-gray-700
            shadow-sm
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
          "
        >
          <icon name="plus" class="icon mr-1" aria-hidden="true" />
          <span>{{ "Add New " + field.label.slice(0, -1) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, PropType } from "vue";
import { isPrimitive, dynamicPrimitive } from "../helpers/formHelpers";
import { FieldSpec } from "../interfaces";
import MarkdownField from "./MarkdownField.vue";
import StringField from "./StringField.vue";
import ImageField from "./ImageField.vue";
import Icon from "../shared/Icon.vue";

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
      required: true,
    },
  },

  emits: ["toggleList", "addFieldToForm", "removeFieldFromForm"],

  setup(props, { emit }) {
    const defaultToggleList = (): boolean[] => {
      if (!props.form[props.field.name]) return [];
      return props.form[props.field.name].map(() => true);
    };

    const fields = props.field.fields as FieldSpec[];
    const titleFieldName = fields[0].name;

    const toggleState = ref([...defaultToggleList()]);

    const isExpanded = (index: number): boolean => {
      return toggleState.value[index];
    };

    const toggle = (index: number) => {
      toggleState.value[index] = !toggleState.value[index];
    };

    const title = (index: number): string => {
      const title = `${props.form[props.field.name][index][titleFieldName]}`;
      return title.length > 20 ? `${title.substring(0, 20)}...` : title;
    };

    const addSet = (event: Event) => {
      emit("addFieldToForm", event, props.field.name);
    };

    const hasError = (index: Number): boolean => {
      if (!props.errors) return false;
      for (const prop in props.errors) {
        if (prop.startsWith(`bundle.${props.field.name}.${index}`)) return true;
      }
      return false;
    };

    return {
      isExpanded,
      toggle,
      title,
      addSet,
      dynamicPrimitive,
      isPrimitive,
      hasError,
    };
  },

  components: {
    MarkdownField,
    StringField,
    ImageField,
    Icon,
  },
};
</script>
