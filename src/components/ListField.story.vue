<template>
  <Story title="ListField">
    <Variant title="Default">
      <ListField :field="spec" :form="model" :errors="{}" />
      <code>
        <pre class="text-gray-600">{{ JSON.stringify(model, null, 2) }}</pre>
      </code>
    </Variant>
    <Variant title="Readonly Reference">
      <ListField
        :field="{ ...spec, fields: readOnlyReferenceFields }"
        :form="model"
        :errors="{}"
      />
      <code>
        <pre class="text-gray-600">{{ JSON.stringify(model, null, 2) }}</pre>
      </code>
    </Variant>
    <Variant title="Error">
      <ListField :field="spec" :form="errorModel" :errors="errors" />
      <code>
        <pre class="text-gray-600">{{ JSON.stringify(model, null, 2) }}</pre>
      </code>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ListField from "./ListField.vue";
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
  widget: "list",
  isReadonly: false,
  fields: fields,
};

const errors = { "bundle.sections.0.reference": ["bad!"] };

const model = ref({
  sections: [
    {
      reference: "John 1:14",
      quote:
        "We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
    },
  ],
});

const errorModel = ref({
  sections: [
    {
      reference: "",
      quote:
        "We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
    },
  ],
});
</script>
