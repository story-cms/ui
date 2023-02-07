<template>
  <div class="space-y-[32px] bg-transparent py-8">
    <div v-for="(_listItem, index) in listItems" :key="index" class="relative">
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-between">
          <button
            type="button"
            class="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="toggle(index)"
          >
            <icon
              v-if="isExpanded(index)"
              name="chevron-down"
              class="icon mr-1"
              aria-hidden="true"
            />
            <icon v-else name="chevron-right" class="icon mr-1" aria-hidden="true" />
            <span>{{ String(sectionTitle(index)) }}</span>
          </button>
          <div
            v-if="itemHasError(index)"
            class="text-accent-one cursor-pointer"
            @click="toggle(index)"
          >
            <div class="rounded-full border bg-white p-2">
              <Icon name="exclamation" class="h-10 w-10" />
            </div>
          </div>
          <div class="cursor-pointer text-red-500" @click="removeSet(index)">
            <div class="rounded-full border bg-white p-2">
              <Icon name="trash" class="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
      <div class="absolute left-4 top-0 -z-10 h-full border-l border-gray-300"></div>
      <div
        v-if="isExpanded(index)"
        class="relative mt-[32px] ml-8 space-y-[24px] rounded border border-gray-100 bg-white p-[32px] shadow-sm"
      >
        <div v-for="(item, i) in fields" :key="item.name + `${i.toString()}`">
          <component
            :is="widgetField(item.widget)"
            :field="item"
            :root-path="`${fieldPath}.${index.toString()}`"
            :is-nested="true"
          />
        </div>
      </div>
    </div>

    <div>
      <AddItemButton :label="'Add ' + field.label" :on-click="addSet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { widgetField } from '../widget-fields';
import type { FieldSpec } from 'App/Models/Interfaces';
import Icon from '../../Shared/Icon.vue';
import { useModelStore } from '../../store';
import AddItemButton from './AddItemButton.vue';

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
});

const emit = defineEmits(['addSet', 'removeSet']);
const field = computed(() => props.field as FieldSpec);
const fields = field.value.fields as FieldSpec[];

const addSet = () => {
  emit('addSet');
};

const removeSet = (index: number) => {
  emit('removeSet', index);
};

const toggleState = ref([false, false, false, false]);

const isExpanded = (index: number): boolean => {
  return toggleState.value[index];
};

const toggle = (index: number) => {
  toggleState.value[index] = !toggleState.value[index];
};

const model = useModelStore();

const sectionTitle = (index: number): string => {
  const peek = title(index);
  return `${field.value.label} : ${peek}`;
};

const title = (index: number): string => {
  let path = `${props.fieldPath}.${index.toString()}`;
  if (field.value.index) {
    path = `${path}.${field.value.index}`;
  } else {
    path = `${path}.${fields[0].name}`;
  }
  const itemTitle = model.getField(path, 'New Section') as string;

  return itemTitle.length > 20 ? `${itemTitle.substring(0, 20)}...` : itemTitle;
};

const itemHasError = (index: number): boolean => {
  for (const key in model.errors) {
    const needle = `bundle.${props.fieldPath}.${index}`;
    if (key.startsWith(needle)) return true;
  }
  return false;
};
</script>
