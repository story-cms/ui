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
      <ModelInspector :model="model" />
    </Variant>

    <Variant title="Readonly Reference">
      <ListField
        :field="{ ...spec, fields: readOnlyReferenceFields }"
        :form="model"
        :errors="{}"
        @add-item="addFieldToForm"
        @remove-item="removeFieldFromForm"
      />
      <ModelInspector :model="model" />
    </Variant>

    <Variant title="Error">
      <ListField :field="spec" :form="errorModel" :errors="errors" />
      <ModelInspector :model="errorModel" />
    </Variant>

    <Variant title="Nested">
      <ListField
        :field="nestedSpec"
        :form="nestedModel"
        :errors="listInListErrors"
      />
      <ModelInspector :model="nestedModel" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { reactive, provide } from "vue";
import ListField from "./ListField.vue";
import { FieldSpec } from "../interfaces";
import ModelInspector from "../helpers/ModelInspector.vue";
import {
  listInListModel,
  listInListSpec,
  listInListErrors,
} from "../helpers/nestedModels";

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

const nestedSpec: FieldSpec = <FieldSpec>listInListSpec;
const nestedModel = reactive(listInListModel);

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
