<template>
  <div class="space-y-[32px] bg-transparent py-8">
    <div v-for="(_listItem, index) in listItems" :key="index">
      <div
        class="relative mt-[32px] space-y-[24px] rounded bg-gray-100 px-[32px] py-3 shadow-sm"
      >
        <div
          class="absolute right-0 mr-3 cursor-pointer text-gray-500"
          @click="removeSet(index)"
        >
          <Icon name="trash" class="h-10 w-10" />
        </div>
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
      <AddItemButton :label="field.label" :on-click="addSet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { widgetField } from '../widget-fields';
import type { FieldSpec } from 'App/Models/Interfaces';
import Icon from '../../Shared/Icon.vue';
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
</script>
