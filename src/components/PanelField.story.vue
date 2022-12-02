<template>
  <Story title="PanelField">
    <Variant title="Default">
      <PanelField name="intro" label="Intro" widget="panel" isReadonly: false,
      :field="spec" :model="model" />
      <code>
        <pre class="text-gray-600">{{ JSON.stringify(model, null, 2) }}</pre>
      </code>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PanelField from "./PanelField.vue";
import { FieldSpec } from "../interfaces";

const fields: FieldSpec[] = [
  {
    label: "Reference",
    name: "reference",
    widget: "string",
    isReadonly: false,
  },
  {
    label: "NIV",
    name: "quote",
    widget: "markdown",
    isReadonly: false,
  },
];

const spec = {
  label: "Sections",
  name: "sections",
  widget: "list",
  isReadonly: false,
  fields: fields,
};

const model = ref({
  reference: "John 1:14",
  quote:
    "We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
});
</script>
