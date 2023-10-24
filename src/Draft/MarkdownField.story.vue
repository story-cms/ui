<template>
  <Story title="Markdown Field" group="widgets">
    <Variant title="With model" :setup-app="loadData">
      <MarkdownField :field="spec" />
      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="With custom toolbar buttons" :setup-app="loadData">
      <MarkdownField
        :field="{
          ...spec,
          toolbar: ['bold', 'italic', 'heading', 'footnote'],
        }"
      />
      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <MarkdownField :field="spec" />
      <ErrorControl :errors="objectErrors" />
    </Variant>

    <Variant title="Minimal" :setup-app="loadData">
      <MarkdownField :field="{ ...spec, minimal: true }" />
    </Variant>

    <Variant title="Toolbar buttons" :setup-app="loadData">
      <MarkdownField
        :field="{
          ...spec,
          toolbar: [
            'bold',
            'italic',
            'heading',
            'quote',
            'unordered-list',
            'ordered-list',
            'link',
          ],
        }"
      />
    </Variant>

    <Variant title="Without Toolbar buttons" :setup-app="loadData">
      <MarkdownField
        :field="{
          ...spec,
          minimal: true,
          toolbar: [],
        }"
      />
    </Variant>

    <Variant title="RTL" :setup-app="loadData">
      <MarkdownField :field="spec" />
      <LanguageControl />
    </Variant>

    <Variant title="Readonly" :setup-app="loadData">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
        }"
        :is-read-only="true"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import MarkdownField from './MarkdownField.vue';
import LanguageControl from '../helpers/LanguageControl.vue';
import ErrorControl from '../helpers/ErrorControl.vue';
import ModelControl from '../helpers/ModelControl.vue';
import { objectErrors, objectModel } from '../helpers/mocks';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { useModelStore } from '../store';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const store = useModelStore();
  if (variant?.title == 'Error') {
    store.errors = objectErrors;
  }
  if (variant?.title == 'Readonly') {
    store.setSource({
      ...objectModel,
      notes: 'This is a readonly note',
    });
  }
  store.model = objectModel;
};

const spec = {
  name: 'notes',
  label: 'Notes',
  widget: 'markdown',
  isReadOnly: false,
};
</script>

<docs lang="md">
# Markdown Field

WYSIWIG markdown editor powered by the amazing CodeMirror engine.

- [CodeMirror - Engine](https://codemirror.net/)
- [EasyMDE - Wrapper](https://github.com/Ionaru/easy-markdown-editor)

## Toolbar customization

You can customize the toolbar by passing a `toolbar` option in the config:

```js
{

  ...

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

  ...

}
```

See the docs: https://github.com/Ionaru/easy-markdown-editor#toolbar-customization
</docs>
