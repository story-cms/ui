<template>
  <div class="w-full bg-gray-50">
    <div class="flex items-center justify-between p-6">
      <h2 class="text-2xl/8 font-semibold">{{ props.chapterTitle }}</h2>
      <div class="flex space-x-6">
        <button
          type="submit"
          class="w-32 rounded-[38px] border-gray-200 bg-white px-[15px] py-[9px] text-sm/5 font-medium text-gray-600 shadow"
        >
          App Preview
        </button>
        <button
          type="submit"
          class="w-32 rounded-[38px] border border-yellow-500 bg-white px-[15px] py-[9px] text-sm/5 font-medium text-yellow-600 shadow"
        >
          Delete Draft
        </button>
        <button
          v-if="
            (!props.hasEditReview || props.draftStatus === 'submitted') &&
            props.user.role === 'admin'
          "
          type="submit"
          class="w-32 rounded-[38px] border-gray-200 bg-green-500 px-[15px] py-[9px] text-sm/5 font-bold text-white shadow"
        >
          Publish
        </button>
      </div>
    </div>
    <div
      class="grid grid-cols-[repeat(2,_minmax(calc(64rem/2),_1fr))] gap-x-2 lg:place-content-center [&>h3]:pb-2 [&>h3]:pl-6 [&>h3]:text-lg/8 [&>h3]:font-semibold [&>h3]:text-gray-800"
    >
      <h3>Afrikaans</h3>
      <h3 class="inline-flex items-center">
        English
        <span class="ml-2">
          <icon
            name="eyeoff"
            class="h-8 w-8 cursor-pointer text-black"
            @click.prevent="toggle"
          />
        </span>
      </h3>
      <hr class="col-span-full" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { User } from '../Shared/interfaces';
import Icon from './Icon.vue';

const props = defineProps({
  chapterTitle: {
    type: String,
    required: true,
  },
  hasEditReview: {
    type: Boolean,
    required: true,
  },
  draftStatus: {
    type: String,
    required: true,
  },
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const emit = defineEmits(['toggle']);

const toggle = () => {
  emit('toggle');
};
</script>
