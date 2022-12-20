<template>
  <Story title="Scripture Field" group="widgets">
    <Variant title="Default">
      <ScriptureField :field="scriptureSpec" />
      <ModelControl :model="scriptureModel" />
    </Variant>
    <Variant title="Error">
      <ScriptureField :field="scriptureSpec" />
      <ErrorControl :errors="scriptureError" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ScriptureField from "./ScriptureField.vue";
import LanguageControl from "../helpers/LanguageControl.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import ModelControl from "../helpers/ModelControl.vue";
import {
  scriptureSpec,
  scriptureModel,
  scriptureError,
} from "../helpers/mocks";
</script>

<docs lang="md">
# Scripture Field
</docs>
