<template>
  <div class="relative bg-white px-8 py-4" :class="{ rtl: language.isRtl }">
    <div class="mx-5">
      <div class="relative">
        <label class="input-label" :class="{ 'text-error': hasError }">{{
          field.label
        }}</label>
        <button
          v-if="url != null && !props.isReadOnly"
          class="absolute top-2 right-0"
          @click.prevent="deleteImage"
        >
          <Icon name="trash" class="h-10 w-10 text-gray-500" />
        </button>
      </div>
      <div
        v-if="hasDropArea"
        class="relative mt-[2px] rounded-md border-2 border-dashed border-gray-300"
      >
        <FileUpload
          class="w-full"
          :description="field.description"
          :extensions="field.extensions"
          :max-size="field.maxSize"
          @file="uploadFile"
        />
        <p v-if="hasError" class="text-sm text-error">
          {{ field.label }} cannot be empty
        </p>
        <div
          v-if="uploading"
          class="absolute top-0 left-0 h-full w-full rounded-md bg-gray-400 bg-opacity-30"
        >
          <div class="h-full bg-accent opacity-30" :style="progress"></div>
        </div>
      </div>
      <div class="flex items-start pt-2">
        <audio v-if="url != null" controls>
          <source :src="url" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from 'vue';
import { FieldSpec, Audio } from 'App/Models/Interfaces';
import { useLanguageStore, useModelStore, useSecretStore } from '../store';
import { commonProps } from '../Shared/helpers';
import FileUpload from './Attachments/FileUpload.vue';
import axios, { AxiosRequestConfig } from 'axios';
import Icon from '../Shared/Icon.vue';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});
const emptyAudio = {
  url: null,
  length: null,
};

const model = useModelStore();

const startValue = model.getField(fieldPath.value, emptyAudio) as Audio;

const url = ref(startValue.url);
const length = ref(startValue.length);

model.$subscribe(() => {
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value) as Audio;
    url.value = fresh.url;
    length.value = fresh.length;
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}.url` in model.errors);
const hasDropArea = computed(() => {
  if (!props.isReadOnly && url.value == null) {
    return true;
  }
  return false;
});
const language = useLanguageStore();

const progress = ref('width:0%');
const provider = field.value.provider;
const uploading = ref(false);
const encryptedSecret = ref('');
const timestamp = Math.round(new Date().getTime() / 1000);

// This hooks to the requestObj onFileProgress event so that we can indicate upload progress.

const onFileProgress = (event: any) => {
  progress.value = 'width:' + Math.round((event.loaded * 100.0) / event.total) + '%';
};

const secrets = useSecretStore();
const uploadPreset = field.value.uploadPreset ?? provider?.defaultPreset ?? '';

//Create the string to sign for cloudinary signed uploads
const secretToSign =
  'tags=browser-upload&timestamp=' +
  timestamp +
  '&upload_preset=' +
  uploadPreset +
  secrets.cloudinarySecret;
const buffer = new TextEncoder().encode(secretToSign);

const encryptSecret = () => {
  crypto.subtle.digest('SHA-1', buffer).then((value) => {
    encryptedSecret.value = Array.from(new Uint8Array(value))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');
  });
};

const deleteImage = () => {
  model.setField(fieldPath.value, emptyAudio);
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value) as Audio;
    url.value = fresh.url;
    length.value = fresh.length;
  });
};

const uploadFile = (files: File) => {
  if (!provider) return;

  uploading.value = true;
  const formData = new FormData();
  formData.append('file', files);
  formData.append('upload_preset', uploadPreset);
  formData.append('tags', 'browser-upload');
  formData.append('api_key', secrets.cloudinaryApiKey);
  formData.append('api_secret', secrets.cloudinarySecret);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', encryptedSecret.value);

  const requestObj: AxiosRequestConfig = {
    url: 'https://api.cloudinary.com/v1_1/' + provider['cloudName'] + '/auto/upload',
    method: 'POST',
    onUploadProgress: onFileProgress,
    data: formData,
  };

  axios(requestObj)
    .then((response) => {
      progress.value = 'width:0%';
      model.setField(fieldPath.value, {
        url: response.data.secure_url,
        length: 10.0, //TODO: get audio duration from file
      });
      uploading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(encryptSecret);
</script>
