<template>
  <button
    v-if="showRequestChangeButton"
    type="submit"
    class="w-32 rounded-[38px] border border-red-500 bg-red-500 px-[15px] py-[9px] text-sm/5 font-medium text-white shadow"
    @click.prevent="emit('request-change')"
  >
    Request Change
  </button>
  <button
    v-if="showSubmitButton"
    type="submit"
    class="w-32 rounded-[38px] border border-blue-500 bg-blue-500 px-[15px] py-[9px] text-sm/5 font-medium text-white shadow"
    @click.prevent="emit('submit')"
  >
    Submit
  </button>

  <button
    v-if="showPublishButton"
    type="submit"
    :disabled="widgets.isDirty"
    class="w-32 rounded-[38px] border border-gray-200 bg-green-500 px-[15px] py-[9px] text-sm/5 font-bold text-white shadow"
    :class="{
      'opacity-80 hover:opacity-80 hover:shadow-none active:opacity-80': widgets.isDirty,
    }"
    @click.prevent="emit('publish')"
  >
    Publish
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useWidgetsStore, useSharedStore, useDraftsStore } from '../store';

const widgets = useWidgetsStore();
const shared = useSharedStore();
const drafts = useDraftsStore();

const emit = defineEmits(['publish', 'request-change', 'submit']);

const showSubmitButton = computed(() => {
  if (shared.user.role === 'admin') return false;
  //   if (!shared.meta.hasEditReview) return false;

  return drafts.draft.status === 'started';
});

const showRequestChangeButton = computed(() => {
  return false;

  //   if (shared.user.role !== 'admin') return false;

  //   return drafts.draft.status === 'submitted';
});

const showPublishButton = computed(() => {
  if (shared.user.role !== 'admin') return false;
  return !showSubmitButton.value;
});
</script>
