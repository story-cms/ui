<template>
  <FoldableList
    v-if="field.canFold"
    :field="field"
    :field-path="fieldPath"
    :list-items="listItems"
    :is-read-only="props.isReadOnly"
    @add-set="addSet"
    @remove-set="removeSet"
  />
  <FlatList
    v-else
    :field="field"
    :field-path="fieldPath"
    :list-items="listItems"
    :is-read-only="props.isReadOnly"
    @add-set="addSet"
    @remove-set="removeSet"
  />
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { commonProps } from '../Shared/helpers';
import type { FieldSpec } from '../Shared/interfaces';
import FlatList from './List/FlatList.vue';
import FoldableList from './List/FoldableList.vue';
import { useModelStore, useWidgetsStore, useSharedStore } from '../store';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed((): string => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const widgets = useWidgetsStore();
const shared = useSharedStore();

const addSet = () => {
  model.addListItem(fieldPath.value);
};

const removeSet = (index: number) => {
  model.removeListItem(fieldPath.value, index);
};

const listItems = props.isReadOnly
  ? ref(model.getSourceField(fieldPath.value, []) as any[])
  : ref(model.getField(fieldPath.value, []) as any[]);

model.$subscribe(() => {
  if (props.isReadOnly) return;

  const fresh = model.getField(fieldPath.value, []) as any[];
  listItems.value = fresh;
});
onBeforeMount(() => {
  if (props.isReadOnly && props.field?.canFold && shared.isTranslation) {
    widgets.setSizeOfItems(listItems.value);
  }
});
</script>
