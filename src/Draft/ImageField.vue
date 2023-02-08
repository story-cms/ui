<template>
  <div class="relative bg-white py-4" :class="{ rtl: language.isRtl }">
    <label class="input-label" :class="{ 'text-red-500': hasError }">{{
      field.label
    }}</label>
    <div
      v-if="!props.isReadOnly"
      class="relative mt-[2px] rounded-md border-2 border-dashed border-gray-300"
    >
      <FileUpload class="w-full" @file="uploadImage" />
      <p v-if="hasError" class="text-red/50 text-sm">{{ field.label }} cannot be empty</p>
      <div
        v-if="uploading"
        class="absolute top-0 left-0 h-full w-full rounded-md bg-gray-400 bg-opacity-30"
      >
        <div class="bg-al-massira-blue h-full opacity-30" :style="progress"></div>
      </div>
    </div>
    <img v-if="modelValue != ''" :src="modelValue" class="mt-1 h-48 w-auto rounded-md" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from 'vue';
import { FieldSpec } from 'App/Models/Interfaces';
import { useLanguageStore, useModelStore, useSecretStore } from '../store';
import { commonProps } from '../Shared/helpers';
import FileUpload from './FileUpload.vue';
import axios, { AxiosRequestConfig } from 'axios';

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

model.$subscribe(() => {
  nextTick().then(() => {
    modelValue.value = model.getField(fieldPath.value, '') as string;
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);
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

const uploadImage = (files: File) => {
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
    url: 'https://api.cloudinary.com/v1_1/' + provider['cloudName'] + '/image/upload',
    method: 'POST',
    onUploadProgress: onFileProgress,
    data: formData,
  };

  axios(requestObj)
    .then((response) => {
      progress.value = 'width:0%';
      model.setField(fieldPath.value, response.data.url);
      uploading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(encryptSecret);
</script>
