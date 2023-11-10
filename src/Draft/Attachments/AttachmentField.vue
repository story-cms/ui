<template>
  <div
    class="bg-white"
    :class="{ 'p-8': !isNested, 'mt-4': isNested, rtl: shared.isRtl }"
  >
    <div class="relative">
      <div class="relative">
        <label
          class="input-label"
          :class="{ 'text-error': hasError, 'text-gray-600': isReadOnly }"
          >{{ field.label }}</label
        >
        <button
          v-if="!!url && !props.isReadOnly"
          class="absolute right-0 top-2"
          type="button"
          @click.prevent="emit('delete')"
        >
          <Icon name="trash" class="h-10 w-10 text-gray-500" />
        </button>
      </div>

      <div v-if="!!url" class="flex items-start pt-2">
        <slot></slot>
      </div>

      <div v-else>
        <div
          v-if="!props.isReadOnly"
          class="relative mt-[2px] rounded-md border-2 border-dashed border-gray-300"
        >
          <FileUpload
            :description="defaults.description"
            :extensions="defaults.extensions"
            :max-size="defaults.maxSize"
            @file="onFile"
          />
          <div
            v-if="uploading"
            class="absolute left-0 top-0 h-full w-full rounded-md bg-gray-400 bg-opacity-30"
          >
            <div class="h-full bg-accent opacity-30" :style="progress"></div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="hasError" class="mt-2 text-sm text-error">{{ errors[0] }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, PropType } from 'vue';
import { FieldSpec } from '../../Shared/interfaces';
import { HostService } from './types';
import { useSharedStore } from '../../store';
import { commonProps } from '../../Shared/helpers';
import FileUpload from './FileUpload.vue';
import Icon from '../../Shared/Icon.vue';

const props = defineProps({
  ...commonProps,

  url: {
    type: null as unknown as PropType<string | null>,
    required: true,
  },

  errors: {
    type: Array as PropType<string[]>,
    required: true,
  },

  hostService: {
    type: Object as PropType<HostService>,
    required: true,
  },
});

const emit = defineEmits(['delete', 'attached']);

const field = computed(() => props.field as FieldSpec);
const shared = useSharedStore();
const progress = ref('width:0.9%');
const uploading = ref(false);

const onFileProgress = (event: any) => {
  progress.value = 'width:' + Math.round(event * 100) + '%';
};

const onFile = async (file: File) => {
  uploading.value = true;
  const result = await props.hostService.upload(file, onFileProgress);
  emit('attached', result);
  uploading.value = false;
};

const hasError = computed(() => props.errors.length > 0);

const defaults = computed(() => {
  switch (props.field?.widget) {
    case 'animation':
      return {
        description: props.field?.description ?? 'Rive (.riv) files up to 5MB',
        extensions: props.field?.extensions ?? ['.riv'],
        maxSize: props.field?.maxSize ?? 5662310,
      };

    case 'audio':
      return {
        description:
          props.field?.description ?? 'WAV, MP3, OGG, AAC, WMA files up to 35MB',
        extensions: props.field?.extensions ?? ['.wav', '.mp3', '.ogg', '.aac', '.wma'],
        maxSize: props.field?.maxSize ?? 35662310,
      };

    default:
      return {
        description: props.field?.description,
        extensions: props.field?.extensions,
        maxSize: props.field?.maxSize,
      };
  }
});
</script>
