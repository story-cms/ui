<template>
  <div class="w-full bg-gray-50">
    <div class="flex items-center justify-between p-6">
      <h2 class="text-2xl/8 font-semibold">{{ chapterTitle }}</h2>
      <HeaderControls
        @delete="emit('delete')"
        @publish="emit('publish')"
        @request-change="emit('request-change')"
        @submit="emit('submit')"
        @info="emit('info')"
      />
    </div>
    <div
      class="grid max-w-5xl lg:place-content-center [&>h3]:pb-2 [&>h3]:pl-6 [&>h3]:text-lg/8 [&>h3]:font-semibold [&>h3]:text-gray-800"
      :class="
        drafts.isSingleColumn
          ? 'grid-cols-2'
          : 'mx-auto  grid-cols-[repeat(2,_minmax(calc(64rem/2),_1fr))] overflow-auto'
      "
    >
      <h3>{{ shared.language.language }}</h3>
      <h3 class="inline-flex items-center">
        English
        <span class="ml-2">
          <Icon
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
import HeaderControls from './HeaderControls.vue';
import Icon from './Icon.vue';
import { computed } from 'vue';
import { useSharedStore, useDraftsStore, useModelStore } from '../store';

const shared = useSharedStore();
const drafts = useDraftsStore();
const model = useModelStore();

const emit = defineEmits(['delete', 'publish', 'request-change', 'submit', 'info']);

const chapterTitle = computed(() => {
  const title = model.getField('title');
  return title ? title : `New ${shared.meta.chapterType}`;
});

const toggle = () => {
  const fresh = !drafts.isSingleColumn;
  drafts.setSingleColumn(fresh);
};
</script>
