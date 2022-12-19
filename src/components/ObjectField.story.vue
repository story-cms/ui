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

    <Variant
      title="Object in List in Object"
      :setup-app="loadObjectInListInObject"
    >
      <ObjectField :field="objectInListInObjectSpec" />
      <ModelControl :model="objectInListInObjectModel" />
    </Variant>

    <Variant title="Object in List in Object Empty">
      <ObjectField :field="objectInListInObjectSpec" />
      <ModelControl :model="objectInListInObjectModel" />
    </Variant>

    <Variant
      title="Object in List in Object Error"
      :setup-app="loadObjectInListInObject"
    >
      <ObjectField :field="objectInListInObjectSpec" />
      <ErrorControl :errors="objectInListInObjectErrors" />
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
  objectInListInObjectSpec,
  objectInListInObjectModel,
  objectInListInObjectErrors,
} from "../helpers/mocks";

const loadListInObject: Vue3StorySetupHandler = ({ app, story, variant }) => {
  const store = useModelStore();
  store.model = listInObjectModel;
};

const loadObjectInListInObject: Vue3StorySetupHandler = ({
  app,
  story,
  variant,
}) => {
  const store = useModelStore();
  store.model = objectInListInObjectModel;
};
</script>
