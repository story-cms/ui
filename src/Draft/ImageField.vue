<template>
  <AttachmentField
    v-bind="props"
    :url="modelValue"
    :has-error="hasError"
    :host-service="host"
    :player="ImagePlayer"
    @delete="onDelete"
    @attached="onAttached"
  >
  </AttachmentField>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { FieldSpec } from '../Shared/interfaces';
import { useModelStore } from '../store';
import { commonProps } from '../Shared/helpers';
import AttachmentField from './Attachments/AttachmentField.vue';
import CloudinaryService from './Attachments/cloudinary-service';
import { AttachmentModel } from './Attachments/types';
import ImagePlayer from './Attachments/ImagePlayer.vue';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const modelValue = ref(model.getField(fieldPath.value, '') as string);
const host = new CloudinaryService(field.value, '/image/upload');

model.$subscribe(() => {
  nextTick().then(() => {
    modelValue.value = model.getField(fieldPath.value, '') as string;
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const onDelete = () => {
  model.setField(fieldPath.value, '');
  nextTick().then(() => {
    modelValue.value = model.getField(fieldPath.value, '') as string;
  });
};

const onAttached = (data: AttachmentModel) => {
  model.setField(fieldPath.value, data.url);
};
</script>
