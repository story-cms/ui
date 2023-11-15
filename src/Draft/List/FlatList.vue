<template>
  <ul
    v-for="(_listItem, index) in listItems"
    :key="index"
    class="my-8 space-y-8 bg-transparent"
  >
    <li class="ml-8 space-y-6 rounded bg-gray-100 px-8 pb-8 pt-3 drop-shadow">
      <div
        v-if="canMutate"
        class="absolute right-0 mr-3 cursor-pointer text-gray-500"
        @click="emit('removeSet', index)"
      >
        <Icon name="trash" class="h-10 w-10" />
      </div>
      <div v-for="(item, i) in fields" :key="item.name + `${i.toString()}`">
        <component
          :is="store.picker(item.widget)"
          :field="item"
          :is-read-only="props.isReadOnly"
          :root-path="`${fieldPath}.${index.toString()}`"
          :is-nested="true"
        />
      </div>
    </li>
  </ul>
  <div v-if="canMutate" class="ml-8">
    <AddItemButton :label="field.label" @add="emit('addSet')" />
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue';
import type { FieldSpec } from '../../Shared/interfaces';
import Icon from '../../Shared/Icon.vue';
import AddItemButton from '../../Shared/AddItemButton.vue';
import { useWidgetsStore, useSharedStore } from '../../store';

const props = defineProps({
  field: {
    type: Object as PropType<FieldSpec>,
    required: true,
  },
  fieldPath: {
    type: String,
    required: true,
  },
  listItems: {
    type: Array,
    required: true,
  },
  isReadOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['addSet', 'removeSet']);
const field = computed(() => props.field as FieldSpec);
const fields = field.value.fields as FieldSpec[];
const store = useWidgetsStore();
const language = useSharedStore();

const canMutate = computed(() => {
  if (props.isReadOnly) return false;

  return !language.isTranslation;
});
</script>
