<template>
  <div>
    <h3 class="mt-6">Form data</h3>
    <code>
      <pre class="my-4 text-emerald-500">{{ pretty }}</pre>
    </code>
    <div v-if="!isInspectOnly">
      <HstJson v-model="formState" title="Desired data" />
      <div class="my-4">
        <HstButton
          color="primary"
          class="bg-emerald-500 htw-p-2"
          @click="setModel"
        >
          Set Data
        </HstButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModelStore } from "../store";
import { computed, ref } from "vue";
import { objectModel } from "./mocks";

const props = defineProps({
  model: {
    type: Object,
    required: false,
  },
  isInspectOnly: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const startingState = props.model || objectModel;

const formState = ref(startingState);

const store = useModelStore();

const setModel = () => {
  store.model = formState.value;
};

const pretty = computed(() => JSON.stringify(store.model, null, 2));
</script>
