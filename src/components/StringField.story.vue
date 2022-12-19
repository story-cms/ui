<template>
  <Story title="String Field" group="widgets">
    <Variant title="With model">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadOnly: false,
        }"
      />
      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="RTL">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadOnly: false,
        }"
      />
      <LanguageControl />
    </Variant>

    <Variant title="Error">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadOnly: false,
        }"
      />
      <ErrorControl :errors="objectErrors" />
    </Variant>

    <Variant title="Readonly">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadOnly: true,
        }"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import StringField from "./StringField.vue";
import LanguageControl from "../helpers/LanguageControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import ModelControl from "../helpers/ModelControl.vue";
import { objectErrors, objectModel } from "../helpers/mocks";
</script>

<docs lang="md">
# String Field
</docs>
