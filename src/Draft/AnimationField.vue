<template>
  <AttachmentField
    v-bind="props"
    :url="url"
    :errors="errors"
    :host-service="host"
    @delete="onDelete"
    @attached="onAttached"
  >
    <RivePlayer :url="url" />
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
import RivePlayer from './Attachments/RivePlayer.vue';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const url = ref(model.getField(fieldPath.value, '') as string);
const host = new CloudinaryService(field.value, '/raw/upload');

model.$subscribe(() => {
  nextTick().then(() => {
    url.value = model.getField(fieldPath.value, '') as string;
  });
});
const errors = computed(() => model.errorMessages(fieldPath.value));

const onDelete = () => {
  model.setField(fieldPath.value, '');
  nextTick().then(() => {
    url.value = model.getField(fieldPath.value, '') as string;
  });
};

const onAttached = (data: AttachmentModel) => {
  model.setField(fieldPath.value, data.url);
};
</script>
