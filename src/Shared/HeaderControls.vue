<template>
  <div class="flex space-x-6">
    <button
      type="submit"
      class="grid h-[42px] w-[42px] cursor-pointer place-content-center rounded-full border border-gray-300 bg-white"
      @click.prevent="emit('info')"
    >
      <Icon name="info" class="h-auto w-6 cursor-pointer text-gray-500" />
    </button>
    <button
      type="submit"
      class="grid h-[42px] w-[42px] cursor-pointer place-content-center rounded-full border border-gray-300 bg-white"
      @click.prevent="emit('app-preview')"
    >
      <Icon name="mobile" class="h-auto w-6 cursor-pointer text-gray-500" />
    </button>
    <button
      type="submit"
      class="grid h-[42px] w-[42px] cursor-pointer place-content-center rounded-full border border-gray-300 bg-white"
      @click="emit('delete')"
    >
      <Icon
        name="trash"
        class="flex h-auto w-6 cursor-pointer items-center justify-center text-gray-500"
      />
    </button>
    <button
      v-if="shared.meta.hasEditReview && drafts.draft.status == 'submitted'"
      type="submit"
      class="min-w-32 rounded-[38px] border border-red-500 bg-red-500 px-[15px] py-[9px] text-sm/5 font-medium text-white shadow"
      @click.prevent="emit('request-change')"
    >
      Request Change
    </button>
    <button
      v-if="shared.meta.hasEditReview && drafts.draft.status === 'started'"
      type="submit"
      class="min-w-32 rounded-[38px] border border-green-500 bg-green-500 px-[15px] py-[9px] text-sm/5 font-medium text-white shadow"
      @click.prevent="emit('submit')"
    >
      Submit
    </button>

    <button
      v-if="showPublishButton"
      type="submit"
      :disabled="widgets.isDirty"
      class="min-w-32 rounded-[38px] border border-gray-200 bg-green-500 px-[15px] py-[9px] text-sm/5 font-bold text-white shadow"
      :class="{
        'opacity-80 hover:opacity-80 hover:shadow-none active:opacity-80':
          widgets.isDirty,
      }"
      @click.prevent="emit('publish')"
    >
      Publish
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useWidgetsStore, useSharedStore, useDraftsStore } from '../store';

import Icon from './Icon.vue';

const widgets = useWidgetsStore();
const shared = useSharedStore();
const drafts = useDraftsStore();

const emit = defineEmits([
  'delete',
  'publish',
  'request-change',
  'submit',
  'info',
  'app-preview',
]);

const showPublishButton = computed(() => {
  if (shared.user.role !== 'admin') return false;

  return !shared.meta.hasEditReview || drafts.draft.status === 'submitted';
});
</script>
