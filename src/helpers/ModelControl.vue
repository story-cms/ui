<template>
  <div>
    <h3 class="mt-6">Form data</h3>
    <code>
      <pre class="my-4 text-emerald-500">{{ pretty }}</pre>
    </code>
    <div v-if="!isInspectOnly">
      <HstJson v-model="formState" title="Desired data" />
      <div class="my-4">
        <HstButton color="primary" class="htw-p-2 bg-emerald-500" @click="setModel">
          Set Data
        </HstButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModelStore } from '../store';
import { computed, ref } from 'vue';
import { objectModel } from './mocks';

const props = defineProps({
  model: {
    type: Object,
    required: false,
    default: objectModel,
  },
  isInspectOnly: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const formState = ref(props.model);

const store = useModelStore();

const setModel = () => {
  store.model = formState.value;
};

const pretty = computed(() => JSON.stringify(store.model, null, 2));
</script>
