<template>
  <div class="row-subgrid my-8 space-y-8 bg-transparent">
    <div
      v-for="(_listItem, index) in listItems"
      :key="index"
      class="row-subgrid relative"
    >
      <div
        v-if="!isReadOnly"
        class="absolute left-4 top-0 -z-0 h-full border-l border-gray-300"
      ></div>
      <div>
        <div v-if="!isReadOnly" class="relative flex justify-between">
          <div
            class="absolute bottom-0 left-0 right-0 top-0 flex items-center"
            :class="drafts.isSingleColumn ? 'w-full' : 'w-screen'"
          >
            <span
              class="z-0 ml-1 max-w-full border-t border-gray-300"
              :class="drafts.isSingleColumn ? 'w-full' : 'w-[calc(100%_-_1.5rem)]'"
            ></span>
          </div>
          <button
            type="button"
            class="z-0 ml-1 inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
            class="z-0 cursor-pointer text-accent-one"
            @click="toggle(index)"
          >
            <div class="rounded-full border bg-white p-2">
              <Icon name="exclamation" class="h-10 w-10 text-red-500" />
            </div>
          </div>
          <div
            v-if="canMutate"
            class="z-10 cursor-pointer text-gray-500"
            @click="emit('removeSet', index)"
          >
            <div v-if="!isReadOnly" class="rounded-full border bg-white p-2">
              <Icon name="trash" class="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="row-subgrid relative"
        :class="{
          'mt-8': isReadOnly,
        }"
      >
        <div v-if="isExpanded(index) && !isReadOnly" class="absolute bottom-0 left-1.5">
          <button
            type="button"
            class="cursor-pointer rounded bg-white px-1.5 py-2 shadow-sm"
            @click="toggle(index)"
          >
            <Icon name="chevron-up-down" class="h-3.5 w-3.5 text-gray-700" />
          </button>
        </div>

        <div v-if="isExpanded(index)" class="row-subgrid relative ml-8">
          <div
            v-for="(item, i) in fields"
            :key="item.name + `${i.toString()}`"
            class="row-subgrid"
          >
            <component
              :is="widgets.picker(item.widget)"
              :class="{
                'rounded border border-gray-200  bg-white drop-shadow-sm':
                  item.widget != 'list',
                'mt-8 rounded border border-gray-200  bg-white p-8 shadow': isIsland(
                  item.widget,
                ),
              }"
              :field="item"
              :is-read-only="props.isReadOnly"
              :root-path="`${fieldPath}.${index.toString()}`"
              :is-nested="true"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="canMutate">
      <AddItemButton :label="field.label" @add="emit('addSet')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import type { FieldSpec } from '../../Shared/interfaces';
import Icon from '../../Shared/Icon.vue';
import {
  useModelStore,
  useWidgetsStore,
  useSharedStore,
  useDraftsStore,
} from '../../store';
import AddItemButton from '../../Shared/AddItemButton.vue';

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
const model = useModelStore();
const widgets = useWidgetsStore();
const shared = useSharedStore();
const drafts = useDraftsStore();

const canMutate = computed(() => {
  if (props.isReadOnly) return false;

  return !shared.isTranslation;
});

const isIsland = (type: string): boolean => {
  const singleWidgets = ['string', 'number', 'markdown', 'image', 'boolean', 'select'];
  return singleWidgets.includes(type);
};

widgets.setListToggles(props.fieldPath, [true, true, true, true, true]);
const toggleState = computed(() => widgets.getListToggles(props.fieldPath));

const isExpanded = (index: number): boolean => {
  return toggleState.value[index];
};

const toggle = (index: number) => {
  const fresh = toggleState.value;
  fresh[index] = !fresh[index];

  widgets.setListToggles(props.fieldPath, fresh);
};

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
  for (const key in shared.errors) {
    const needle = `bundle.${props.fieldPath}.${index}`;
    if (key.startsWith(needle)) return true;
  }
  return false;
};
</script>
