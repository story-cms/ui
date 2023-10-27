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
          @click="emit('delete')"
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
      class="grid max-w-5xl lg:place-content-center [&>h3]:pb-2 [&>h3]:pl-6 [&>h3]:text-lg/8 [&>h3]:font-semibold [&>h3]:text-gray-800"
      :class="
        store.isSingleColumn
          ? 'grid-cols-2'
          : 'mx-auto  grid-cols-[repeat(2,_minmax(calc(64rem/2),_1fr))] overflow-auto'
      "
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
    </div>
    <hr class="col-span-full" />
  </div>
</template>
<script setup lang="ts">
import { User } from '../Shared/interfaces';
import Icon from './Icon.vue';
import { useLanguageStore } from '../store';

const props = defineProps<{
  chapterTitle: string;
  hasEditReview: boolean;
  draftStatus: string;
  user: User;
}>();

const emit = defineEmits(['delete']);

const store = useLanguageStore();

const toggle = () => {
  const fresh = !store.isSingleColumn;
  store.setSingleColumn(fresh);
};
</script>
