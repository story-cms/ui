<template>
  <button
    type="submit"
    :disabled="props.isDisabled"
    class="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-accent-green px-3 py-2 text-sm font-medium leading-5 text-white hover:opacity-80 hover:shadow-md active:opacity-80 xl:w-1/3"
    :class="{
      'opacity-80 hover:opacity-80 hover:shadow-none active:opacity-80': props.isDisabled,
    }"
    @click.prevent="$emit('click')"
  >
    Publish
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  isDisabled: boolean;
}>();

defineEmits(['click']);
</script>
