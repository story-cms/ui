<template>
  <p>Field: {{ field.name }}</p>
  <p>Model: <pre>{{ JSON.stringify(model, null, 2) }}</pre></p>
</template>
<script lang="ts">
import { PropType } from "vue";
import { FieldSpec } from "../interfaces";

export default {
  props: {
    field: {
      type: Object as PropType<FieldSpec>,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
  },
};
</script>
