<template>
  <Story title="ObjectField">
    <Variant title="Default">
      <ObjectField
        :field="{
          name: 'nt',
          label: '',
          widget: 'object',
          isReadonly: false,
          fields: fields,
        }"
        :form="model"
      />
      <code>
        <pre class="text-gray-600">{{ JSON.stringify(model, null, 2) }}</pre>
      </code>
    </Variant>

    <Variant title="Error">
      <ObjectField
        :field="{
          name: 'nt',
          label: '',
          widget: 'object',
          isReadonly: false,
          fields: fields,
        }"
        :form="model"
        :errors="errors"
      />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ObjectField from "./ObjectField.vue";
import { FieldMap } from "../interfaces";

const fields: FieldMap = {
  reference: {
    label: "Reference",
    name: "reference",
    widget: "string",
    isReadonly: false,
  },
  quote: {
    label: "NIV",
    name: "quote",
    widget: "markdown",
    isReadonly: false,
  },
};
const errors = { "bundle.nt.reference": ["bad!"] };
const model = ref({
  nt: {
    reference: "John 1:14",
    quote:
      "We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
  },
});
</script>
