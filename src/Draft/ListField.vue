<template>
  <div class="space-y-[32px] bg-transparent py-8">
    <div v-for="(_listItem, index) in listItems" :key="index" class="relative">
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center">
          <button
            @click="toggle(index)"
            type="button"
            class="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
            class="text-accent-one absolute left-0 cursor-pointer"
            @click="toggle(index)"
          >
            <div class="rounded-full border bg-white p-2">
              <Icon name="exclamation" class="h-10 w-10" />
            </div>
          </div>
          <div
            class="absolute right-0 cursor-pointer text-red-500"
            @click="removeSet(index)"
          >
            <div class="rounded-full border bg-white p-2">
              <Icon name="trash" class="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isExpanded(index)"
        class="relative mt-[32px] space-y-[24px] rounded border border-gray-100 bg-white p-[32px] shadow-sm"
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

    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center">
        <button
          @click="addSet"
          type="button"
          class="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <icon name="plus" class="icon mr-1" aria-hidden="true" />
          <span>{{ 'Add New ' + field.label.slice(0, -1) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { commonProps } from '../Shared/helpers';
import { widgetField } from './widget-fields';
import type { FieldSpec } from 'App/Models/Interfaces';
import Icon from '../Shared/Icon.vue';
import { useModelStore } from '../store';

// name: "ListField",

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed((): string => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const fields = field.value.fields as FieldSpec[];

const toggleState = ref([false, false, false, false]);

const isExpanded = (index: number): boolean => {
  return toggleState.value[index];
};

const toggle = (index: number) => {
  toggleState.value[index] = !toggleState.value[index];
};

const sectionTitle = (index: number): string => {
  const peek = title(index);
  return `${field.value.label} : ${peek}`;
};

const title = (index: number): string => {
  const titleFieldName = fields[0].name;
  const item = listItems.value[index];
  const itemTitle = item[titleFieldName];
  if (itemTitle === undefined) return 'New Section';
  return itemTitle.length > 20 ? `${itemTitle.substring(0, 20)}...` : itemTitle;
};

const addSet = () => {
  model.addListItem(fieldPath.value);
};

const removeSet = (index: number) => {
  model.removeListItem(fieldPath.value, index);
};

const model = useModelStore();
const listItems = ref(model.getField(fieldPath.value, []) as any[]);

model.$subscribe(() => {
  const isFirstLoad = listItems.value === undefined;
  nextTick().then(() => {
    listItems.value = model.getField(fieldPath.value, []) as any[];
    if (!isFirstLoad) return;
    toggleState.value = listItems.value.map(() => false);
  });
});

const itemHasError = (index: number): boolean => {
  for (const key in model.errors) {
    const needle = `bundle.${fieldPath.value}.${index}`;
    if (key.startsWith(needle)) return true;
  }
  return false;
};
</script>
