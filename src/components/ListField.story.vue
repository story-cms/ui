<template>
  <Story title="ListField">
    <Variant title="Default" :setup-app="loadData">
      <ListField :field="listSpec" />
      <ModelControl :model="listModel" :is-inspect-only="true" />
    </Variant>

    <Variant title="Load data">
      <ListField :field="listSpec" />
      <ModelControl :model="listModel" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <ListField :field="spec" />
      <ErrorControl :errors="listErrors" />
    </Variant>

    <Variant title="Nested" :setup-app="loadNestedData">
      <ListField :field="nestedSpec" />
      <ModelControl :model="nestedModel" />
    </Variant>
    <Variant title="Nested Error" :setup-app="loadNestedData">
      <ListField :field="nestedSpec" />
      <ErrorControl :errors="listInListErrors" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { Vue3StorySetupHandler } from "@histoire/plugin-vue";
import { useModelStore } from "../store";

import ListField from "./ListField.vue";
import { FieldSpec } from "../interfaces";
import ModelControl from "../helpers/ModelControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import {
  listSpec,
  listModel,
  listErrors,
  listInListModel,
  listInListSpec,
  listInListErrors,
} from "../helpers/mocks";

const loadData: Vue3StorySetupHandler = ({ app, story, variant }) => {
  const store = useModelStore();
  store.model = listModel;
};

const loadNestedData: Vue3StorySetupHandler = ({ app, story, variant }) => {
  const store = useModelStore();
  store.model = listInListModel;
};

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
