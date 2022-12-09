<template>
  <div
    :class="{
      'rounded border border-gray-100 bg-white p-8 shadow-sm': !isNested,
      'mt-8': field.name == 'extra',
    }"
  >
    <label
      for="first-name"
      class="block text-sm font-medium text-gray-700"
      :class="{ rtl: store.isRtl }"
      >{{ field.label }}</label
    >
    <div class="mt-1">
      <div :class="{ 'rounded border border-red-300': error }">
        <textarea :value="modelValue" ref="textArea"></textarea>
      </div>
      <p class="mt-[8px] text-sm text-red-500" v-if="error"
        >This field cannot be empty</p
      >
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, ref, onMounted, inject } from "vue";
import { FieldSpec } from "../interfaces";
import { useLanguageStore } from "../store";

import EasyMDE from "easymde";

export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    field: {
      type: Object as PropType<FieldSpec>,
      required: true,
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

  emits: ["update:modelValue"],

  setup(_, { emit }) {
    const store = useLanguageStore();

    const textArea = ref(undefined);
    let editor: EasyMDE;

    const update = () => {
      emit("update:modelValue", editor.value());
    };

    onMounted(() => {
      const store = useLanguageStore();

      editor = new EasyMDE({
        element: textArea.value,
        spellChecker: false,
        nativeSpellcheck: false,
        status: false,
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "unordered-list",
          "ordered-list",
          "|",
          "link",
          {
            name: "footnote",
            action: (editor) => {
              const selection = editor.codemirror.getSelection();
              const newValue = `[${selection}](^${selection})`;
              return editor.codemirror.replaceSelection(newValue);
            },
            className: "fa fa-asterisk",
            title: "Footnote Button",
          },
          "|",
          "preview",
          "side-by-side",
          "fullscreen",
          "guide",
        ],
      });
      editor.codemirror.setOption("direction", store.languageDirection);
      editor.codemirror.setOption("rtlMoveVisually", store.isRtl);
      editor.codemirror.on("change", update);
      editor.codemirror.setOption("theme", store.locale);
    });

    return { textArea, store };
  },
};
</script>
<style>
@import "easymde/dist/easymde.min.css";
</style>
