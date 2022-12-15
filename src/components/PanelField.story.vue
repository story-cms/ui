<template>
  <Story title="PanelField">
    <Variant title="Default">
      <PanelField :field="spec" />
      <ModelControl :model="panelModel" />
    </Variant>
    <Variant title="Readonly Reference">
      <PanelField :field="{ ...spec, fields: readOnlyTitle }" />
      <ModelControl :model="panelModel" />
    </Variant>
    <Variant title="Error">
      <PanelField :field="spec" />
      <ErrorControl :errors="panelErrors" />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import PanelField from "./PanelField.vue";
import ModelControl from "../helpers/ModelControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import { panelErrors, panelModel } from "../helpers/mocks";

const spec = {
  label: "Note",
  name: "note",
  widget: "panel",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
    },
    {
      label: "Description",
      name: "description",
      widget: "markdown",
    },
  ],
};

const readOnlyTitle = [
  {
    label: "Title",
    name: "title",
    widget: "string",
    isReadOnly: true,
  },
  {
    label: "Description",
    name: "description",
    widget: "markdown",
  },
];
</script>
