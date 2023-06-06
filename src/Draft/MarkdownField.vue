<template>
  <div
    :class="{
      'rounded border border-gray-100 bg-white p-8 drop-shadow-sm': !isNested,
      'mt-4': isNested,
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
          'opacity-50': props.isReadOnly,
        }"
      >
        <textarea ref="textArea" :readonly="props.isReadOnly" />
      </div>
      <p v-if="hasError" class="mt-[8px] text-sm text-error">
        This field cannot be empty
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from 'vue';
import { FieldSpec } from '../Shared/interfaces';
import { useLanguageStore, useModelStore } from '../store';
import { commonProps } from '../Shared/helpers';
import type { Editor, EditorChange } from 'codemirror';
import { customToolbarButtons, defaultButtons } from './Markdown/toolbar-buttons';
import type EasyMDE from './Markdown/types';
// import EasyMDE from 'easymde';

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
    const fresh = model.getField(fieldPath.value, '') as unknown as string;
    if (fresh === mde?.value()) return;

    mde?.codemirror.setValue(fresh);
  });
};

model.$subscribe(load);

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const language = useLanguageStore();
language.$subscribe(() => {
  mde?.codemirror.setOption('direction', language.languageDirection);
  mde?.codemirror.setOption('rtlMoveVisually', language.isRtl);
  mde?.codemirror.setOption('theme', language.locale);
});

let mde: EasyMDE | null = null;
const textArea = ref(undefined);

const toolbar = computed((): any[] => {
  if (props.isReadOnly) return [];
  // NOTE: make sure to clone the field before passing it to MDE where it is mutated
  if (field.value.toolbar)
    return Array.from(
      field.value.toolbar.map((item) => {
        const obj = customToolbarButtons.find((obj) => obj.name === item);
        return obj ? obj : item;
      }),
    );

  return defaultButtons;
});

onMounted(async () => {
  // to be able to export the component without browser references,
  // we have to dynamically import the easymde dependency
  const easymdeModule = await import('easymde');
  const EasyMDE = easymdeModule.default;
  mde = new EasyMDE({
    minHeight: field.value.minimal ? 'auto' : '300px',
    element: textArea.value,
    spellChecker: false,
    nativeSpellcheck: false,
    status: false,
    toolbar: toolbar.value,
  });
  mde?.codemirror.setOption('readOnly', props.isReadOnly);
  mde?.codemirror.on('change', update);
  load();
});
</script>

<style>
@import 'easymde/dist/easymde.min.css';

.editor-toolbar {
  background-color: white !important;
}
</style>
