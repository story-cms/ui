<template>
  <Story title="String Field">
    <Variant title="With model">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: false,
        }"
        v-model="season"
      />
    </Variant>

    <Variant title="Unbound">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: false,
        }"
      />
    </Variant>

    <Variant title="Error">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: false,
        }"
        :error="{}"
      />
    </Variant>

    <Variant title="Readonly">
      <StringField
        :field="{
          name: 'name',
          label: 'Name',
          widget: 'string',
          isReadonly: true,
        }"
        v-model="season"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from "vue";

import StringField from "./StringField.vue";
const season = ref("Spring");
</script>
