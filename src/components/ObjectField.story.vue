<template>
  <Story title="ObjectField">
    <Variant title="Default">
      <ObjectField :field="objectSpec" />
      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="Error">
      <ObjectField :field="objectSpec" />
      <ErrorControl :errors="objectErrors" />
    </Variant>

    <Variant title="List in Object" :setup-app="loadListInObject">
      <ObjectField :field="listInObjectSpec" />
      <ModelControl :model="listInObjectModel" />
    </Variant>

    <Variant title="List in Object Empty">
      <ObjectField :field="listInObjectSpec" />
      <ModelControl :model="listInObjectModel" />
    </Variant>

    <Variant title="List in Object Error" :setup-app="loadListInObject">
      <ObjectField :field="listInObjectSpec" />
      <ErrorControl :errors="listInObjectError" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { Vue3StorySetupHandler } from "@histoire/plugin-vue";
import { useModelStore } from "../store";
import ObjectField from "./ObjectField.vue";
import StringField from "./StringField.vue";
import LanguageControl from "../helpers/LanguageControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import ModelControl from "../helpers/ModelControl.vue";
import {
  objectErrors,
  objectModel,
  objectSpec,
  listInObjectSpec,
  listInObjectModel,
  listInObjectError,
} from "../helpers/mocks";

const loadListInObject: Vue3StorySetupHandler = ({ app, story, variant }) => {
  const store = useModelStore();
  store.model = listInObjectModel;
};
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
