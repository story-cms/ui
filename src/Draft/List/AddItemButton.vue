<template>
  <button
    class="inline-flex items-center rounded-full bg-indigo-200 px-3 py-1 text-indigo-700"
    @click="props.onClick"
  >
    <span>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 1V5M5 5V9M5 5H9M5 5L1 5"
          stroke="#4338CA"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="currentColor"
        />
      </svg>
    </span>
    <span class="ml-2">{{ props.label }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
});
</script>
