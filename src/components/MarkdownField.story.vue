<template>
  <Story title="Markdown Field" group="widgets">
    <Variant title="With model">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
          isReadOnly: false,
        }"
      />
      <ModelControl :model="simpleModel" />
    </Variant>

    <Variant title="RTL">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
          isReadOnly: false,
        }"
      />
      <LanguageControl />
    </Variant>

    <Variant title="Error">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
          isReadOnly: false,
        }"
      />
      <ErrorControl :errors="simpleErrors" />
    </Variant>

    <Variant title="Readonly">
      <MarkdownField
        :field="{
          name: 'notes',
          label: 'Notes',
          widget: 'markdown',
          isReadOnly: true,
        }"
      />
      <ModelControl :model="simpleModel" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import MarkdownField from "./MarkdownField.vue";
import LanguageControl from "../helpers/LanguageControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import ModelControl from "../helpers/ModelControl.vue";
import { simpleErrors, simpleModel } from "../helpers/mocks";
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
