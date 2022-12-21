<template>
  <p>Field: {{ field.name }}</p>
  <p>Widget: {{ field.widget }}</p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FieldSpec } from "App/Models/Interfaces";
import { commonProps } from "../Shared/helpers";
const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
</script>
