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
          'rounded border border-error': hasError,
          'opacity-50': field.isReadOnly,
        }"
      >
        <textarea :readonly="field.isReadOnly" ref="textArea"></textarea>
      </div>
      <p class="mt-[8px] text-sm text-error" v-if="hasError">
        This field cannot be empty
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from 'vue';
import { FieldSpec } from 'App/Models/Interfaces';
import { useLanguageStore, useModelStore } from '../store';
import { commonProps } from '../Shared/helpers';
import type { Editor, EditorChange } from 'codemirror';
import type EasyMDE from 'easymde';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const update = (e: Editor, change: EditorChange) => {
  if (change.origin === 'setValue') return;
  model.setField(fieldPath.value, e.getValue());
};

const load = () => {
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value, '') as string;
    if (fresh === editor.value()) return;

    editor.codemirror.setValue(fresh);
  });
};

model.$subscribe(load);

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const language = useLanguageStore();
language.$subscribe(() => {
  editor.codemirror.setOption('direction', language.languageDirection);
  editor.codemirror.setOption('rtlMoveVisually', language.isRtl);
  editor.codemirror.setOption('theme', language.locale);
});

let editor: EasyMDE;
const textArea = ref(undefined);

onMounted(async () => {
  // needed for SSR of Codemirror
  const easymdeModule = await import('easymde');
  const EasyMDE = easymdeModule.default;
  editor = new EasyMDE({
    element: textArea.value,
    spellChecker: false,
    nativeSpellcheck: false,
    status: false,
    toolbar: field.value.isReadOnly
      ? []
      : [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          {
            name: 'footnote',
            action: (instance) => {
              const selection = instance.codemirror.getSelection();
              const newValue = `[${selection}](^${selection})`;
              return instance.codemirror.replaceSelection(newValue);
            },
            className: 'fa fa-asterisk',
            title: 'Footnote Button',
          },
          '|',
          'preview',
          'side-by-side',
          'fullscreen',
          'guide',
        ],
  });
  editor.codemirror.setOption('readOnly', field.value.isReadOnly);
  editor.codemirror.on('change', update);
  if (field.value.minimal) {
    editor.codemirror.setOption('theme', 'minimal');
    const collection = document.getElementsByClassName(
      'cm-s-minimal',
    ) as HTMLCollectionOf<HTMLElement>;

    Array.from(collection).forEach((element) => {
      let nodeList = Array.from(
        element.getElementsByClassName(
          'CodeMirror-scroll',
        ) as HTMLCollectionOf<HTMLElement>,
      );
      nodeList.forEach((node) => {
        node.style.removeProperty('min-height');
      });
    });
  }
  load();
});
</script>

<style>
@import 'easymde/dist/easymde.min.css';
</style>
