<template>
  <AppLayout>
    <ContentHeader
      :title="chapterTitle"
      @delete="emit('delete')"
      @info="emit('info')"
      @app-preview="emit('app-preview')"
    >
      <WorkflowButtons
        @submit="emit('submit')"
        @publish="emit('publish')"
        @request-change="emit('request-change')"
      />
      <template #labels>
        <div
          class="flex items-center justify-between [&>h3]:pb-2 [&>h3]:text-lg/8 [&>h3]:font-semibold [&>h3]:text-gray-800"
        >
          <h3 class="text-left">{{ shared.language.language }}</h3>
          <h3 class="inline-flex items-center justify-end">
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
      </template>
    </ContentHeader>

    <div
      class="container relative mx-auto grid min-h-screen gap-x-2 [&>section]:mt-2"
      :class="{
        'grid-flow-col-dense grid-cols-[repeat(2,_minmax(40rem,_1fr))] overflow-x-auto':
          !drafts.isSingleColumn,
        'grid-cols-1': drafts.isSingleColumn,
        'grid-cols-[1fr,_416px]': showSideBar,
      }"
    >
      <slot></slot>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from './AppLayout.vue';
import { useDraftsStore, useSharedStore } from '../store';
import ContentHeader from './ContentHeader.vue';
import WorkflowButtons from '../Draft/WorkflowButtons.vue';
import Icon from './Icon.vue';

defineProps<{
  chapterTitle: string;
  showSideBar: boolean;
}>();

const emit = defineEmits([
  'delete',
  'publish',
  'request-change',
  'submit',
  'info',
  'app-preview',
]);

const shared = useSharedStore();
const drafts = useDraftsStore();

const toggle = () => {
  const fresh = !drafts.isSingleColumn;
  drafts.setSingleColumn(fresh);
};
</script>
