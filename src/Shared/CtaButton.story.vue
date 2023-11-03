<template>
  <Story title="CTA Button" group="shared">
    <Variant title="Default">
      <CtaButton :is-disabled="false" @click="click" />
    </Variant>
    <Variant title="Disabled">
      <CtaButton :is-disabled="true" @click="click" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import CtaButton from './CtaButton.vue';
const click = () => {
  console.log('clicked');
};
</script>
