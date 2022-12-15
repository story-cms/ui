<template>
  <Story title="ListField">
    <Variant title="Default">
      <ListField
        :field="spec"
        :form="model"
        :errors="{}"
        @add-item="addFieldToForm"
        @remove-item="removeFieldFromForm"
      />
      <ModelControl :model="model" />
    </Variant>

    <Variant title="Readonly Reference">
      <ListField
        :field="{ ...spec, fields: readOnlyReferenceFields }"
        :form="model"
        :errors="{}"
        @add-item="addFieldToForm"
        @remove-item="removeFieldFromForm"
      />
      <ModelControl :model="model" />
    </Variant>

    <Variant title="Error">
      <ListField :field="spec" :form="errorModel" :errors="errors" />
      <ModelControl :model="errorModel" />
    </Variant>

    <Variant title="Nested">
      <ListField
        :field="nestedSpec"
        :form="nestedModel"
        :errors="listInListErrors"
      />
      <ModelControl :model="nestedModel" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { reactive, provide } from "vue";
import ListField from "./ListField.vue";
import { FieldSpec } from "../interfaces";
import ModelControl from "../helpers/ModelControl.vue";
import {
  listInListModel,
  listInListSpec,
  listInListErrors,
} from "../helpers/mocks";

const fields: FieldSpec[] = [
  {
    label: "Reference",
    name: "reference",
    widget: "string",
    isReadOnly: false,
  },
  {
    label: "NIV",
    name: "quote",
    widget: "markdown",
    isReadOnly: false,
  },
];

const nestedSpec: FieldSpec = <FieldSpec>listInListSpec;
const nestedModel = reactive(listInListModel);

const readOnlyReferenceFields: FieldSpec[] = [
  {
    label: "Reference",
    name: "reference",
    widget: "string",
    isReadOnly: true,
  },
  {
    label: "NIV",
    name: "quote",
    widget: "markdown",
    isReadOnly: false,
  },
];

const spec = {
  label: "Sections",
  name: "sections",
  widget: "list",
  isReadOnly: false,
  fields: fields,
};

const errors = { "bundle.sections.0.reference": ["bad!"] };

const model = reactive({
  sections: [
    {
      reference: "John 1:14",
      quote:
        "We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
    },
  ],
});

const addFieldToForm = (path: string) => {
  console.log("! addFieldToForm");

  // addDeepField(model, path);
};

const removeFieldFromForm = (event: Event, key: string, index: number) => {
  // removeField(event, model, key, index);
};

const errorModel = reactive({
  sections: [
    {
      reference: "",
      quote:
        "We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
    },
  ],
});
</script>
