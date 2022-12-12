<template>
  <Story title="PanelField">
    <Variant title="Default">
      <PanelField :field="spec" :form="model" />
      <ModelControl :model="model" />
    </Variant>
    <Variant title="Readonly Reference">
      <PanelField
        :field="{ ...spec, fields: readOnlyReferenceFields }"
        :form="model"
      />
      <ModelControl :model="model" />
    </Variant>
    <Variant title="Error">
      <PanelField :field="spec" :form="errorModel" :errors="errors" />
      <ModelControl :model="errorModel" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PanelField from "./PanelField.vue";
import ModelControl from "../helpers/ModelControl.vue";
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

const readOnlyReferenceFields: FieldSpec[] = [
  {
    label: "Reference",
    name: "reference",
    widget: "string",
    isReadonly: true,
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
  widget: "panel",
  isReadonly: false,
  fields: fields,
};

const errors = { "bundle.reference": ["bad!"] };

const model = ref({
  reference: "John 1:14",
  quote:
    "We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
});

const errorModel = ref({
  reference: "",
  quote:
    "We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
});
</script>
