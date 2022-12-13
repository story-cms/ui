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
      :class="{ rtl: language.isRtl }"
      >{{ field.label }}</label
    >
    <div class="mt-1">
      <div
        :class="{
          'rounded border border-red-300': hasError,
          'opacity-40': field.isReadonly,
        }"
      >
        <textarea :readonly="field.isReadonly" ref="textArea"></textarea>
      </div>
      <p class="mt-[8px] text-sm text-red-500" v-if="hasError"
        >This field cannot be empty</p
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from "vue";
import { FieldSpec } from "../interfaces";
import { useLanguageStore, useModelStore } from "../store";
import { commonProps } from "../helpers/form-helpers";
import EasyMDE from "easymde";
import CodeMirror from "codemirror";

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const update = (e: CodeMirror.Editor, change: CodeMirror.EditorChange) => {
  console.log("change", change.origin);
  if (change.origin === "setValue") return;
  model.setField(fieldPath.value, e.getValue());
};

model.$subscribe(() => {
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value, "") as string;
    if (fresh === editor.value()) return;

    console.log("fresh", fresh);
    editor.codemirror.setValue(fresh);
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const language = useLanguageStore();
language.$subscribe(() => {
  editor.codemirror.setOption("direction", language.languageDirection);
  editor.codemirror.setOption("rtlMoveVisually", language.isRtl);
  editor.codemirror.setOption("theme", language.locale);
});

let editor: EasyMDE;
const textArea = ref(undefined);

onMounted(() => {
  console.log("mounting");

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
  editor.codemirror.setOption("readOnly", field.value.isReadonly);
  editor.codemirror.on("change", update);
});
</script>

<style>
@import "easymde/dist/easymde.min.css";
</style>
