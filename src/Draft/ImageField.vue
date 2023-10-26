<template>
  <AttachmentField
    v-bind="props"
    :url="modelValue"
    :errors="errors"
    :host-service="host"
    @delete="onDelete"
    @attached="onAttached"
  >
    <ImagePlayer :url="modelValue" />
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
const modelValue = props.isReadOnly
  ? ref(model.getSourceField(fieldPath.value, '') as string)
  : ref(model.getField(fieldPath.value, ''));

const host = new CloudinaryService(field.value, '/image/upload');

model.$subscribe(() => {
  if (props.isReadOnly) return;

  nextTick().then(() => {
    modelValue.value = model.getField(fieldPath.value, '') as string;
  });
});

const errors = computed(() => model.errorMessages(fieldPath.value));

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
