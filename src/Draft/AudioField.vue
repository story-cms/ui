<template>
  <AttachmentField
    v-bind="props"
    :url="url"
    :host-service="host"
    :errors="errors"
    @delete="onDelete"
    @attached="onAttached"
  >
    <AudioPlayer :url="url" @duration="onAudioDuration" />
  </AttachmentField>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue';
import { FieldSpec, Audio } from '../Shared/interfaces';
import { useModelStore } from '../store';
import { commonProps } from '../Shared/helpers';
import AttachmentField from './Attachments/AttachmentField.vue';
import S3Service from './Attachments/s3-service';
import { AttachmentModel } from './Attachments/types';
import AudioPlayer from './Attachments/AudioPlayer.vue';

const props = defineProps({
  ...commonProps,
  filePath: {
    type: String,
    required: false,
    default: '',
  },
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

const startValue = props.isReadOnly
  ? model.getSourceField(fieldPath.value, emptyAudio)
  : (model.getField(fieldPath.value, emptyAudio) as Audio);

const url = ref(startValue.url);
const length = ref(startValue.length);
const host = new S3Service(props.filePath);
let durationReady = false;

model.$subscribe(() => {
  if (props.isReadOnly) return;

  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value) as Audio;
    url.value = fresh.url;
    length.value = fresh.length;
  });
});

const errors = computed(() => model.errorMessages(fieldPath.value));

const onDelete = () => {
  model.setField(fieldPath.value, emptyAudio);
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value) as Audio;
    url.value = fresh.url;
    length.value = fresh.length;
  });
};

const onAttached = async (data: AttachmentModel) => {
  model.setField(fieldPath.value, {
    url: data.url,
    length: length.value,
  });
};

const onAudioDuration = (duration: number) => {
  length.value = duration;
  durationReady = true;
};

watch(
  () => length.value,
  (newLength, oldLength) => {
    if (newLength !== null && newLength !== oldLength && durationReady) {
      model.setField(fieldPath.value, {
        url: url.value,
        length: newLength,
      });
    }
  },
  { immediate: true },
);
</script>
