<template>
  <Story title="ObjectField">
    <Variant title="Default">
      <ObjectField
        :field="{
          name: 'address',
          label: '',
          widget: 'object',
          fields: [
            {
              name: 'street',
              label: 'Street',
              widget: 'string',
            },
            {
              name: 'city',
              label: 'City',
              widget: 'string',
            },
            {
              name: 'zip',
              label: 'Zip',
              widget: 'string',
            },
          ],
        }"
      />
      <ModelControl :model="simpleModel" />
    </Variant>

    <Variant title="Error">
      <ObjectField
        :field="{
          name: 'address',
          label: '',
          widget: 'object',
          fields: [
            {
              name: 'street',
              label: 'Street',
              widget: 'string',
            },
            {
              name: 'city',
              label: 'City',
              widget: 'string',
            },
            {
              name: 'zip',
              label: 'Zip',
              widget: 'string',
            },
          ],
        }"
      />
      <ErrorControl :errors="simpleErrors" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ObjectField from "./ObjectField.vue";
import StringField from "./StringField.vue";
import LanguageControl from "../helpers/LanguageControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import ModelControl from "../helpers/ModelControl.vue";
import { simpleErrors, simpleModel } from "../helpers/mocks";
</script>

<!-- 
<script lang="ts" setup>
import { ref } from "vue";
import ObjectField from "./ObjectField.vue";
import { FieldMap } from "../interfaces";

const fields: FieldMap = {
  reference: {
    label: "Reference",
    name: "reference",
    widget: "string",
    isReadOnly: false,
  },
  quote: {
    label: "NIV",
    name: "quote",
    widget: "markdown",
    isReadOnly: false,
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
</script> -->
