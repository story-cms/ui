<template>
  <AttachmentField
    v-bind="props"
    :url="url"
    :has-error="hasError"
    :host-service="host"
    @delete="onDelete"
    @attached="onAttached"
  >
    <AudioPlayer :url="url" />
  </AttachmentField>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { FieldSpec } from '../Shared/interfaces';
import { useModelStore } from '../store';
import { commonProps } from '../Shared/helpers';
import AttachmentField from './Attachments/AttachmentField.vue';
import S3Service from './Attachments/s3-service';
import { AttachmentModel, Audio } from './Attachments/types';
import AudioPlayer from './Attachments/AudioPlayer.vue';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();

const emptyAudio = {
  url: null,
  length: null,
};

const startValue = model.getField(fieldPath.value, emptyAudio) as Audio;
const url = ref(startValue.url);
const length = ref(startValue.length);
const host = new S3Service(field.value);

model.$subscribe(() => {
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value) as Audio;
    url.value = fresh.url;
    length.value = fresh.length;
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);

const onDelete = () => {
  model.setField(fieldPath.value, emptyAudio);
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value) as Audio;
    url.value = fresh.url;
    length.value = fresh.length;
  });
};

const onAttached = (data: AttachmentModel) => {
  model.setField(fieldPath.value, {
    url: data.url,
    length: 10.0, //TODO: get audio duration from file
  });
};
</script>
