<template>
  <AppLayout>
    <!-- <ContentHeader :title="title" @delete="deletePage" @info="info"> </ContentHeader> -->

    <div class="container mx-auto mb-32 p-4">
      <div class="flex justify-between space-x-8">
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="w-max flex-grow overflow-hidden rounded-sm lg:max-w-[800px]"
          v-html="bundleView"
        ></div>
        <div class="sticky top-0 h-full w-[416px]">
          <div
            class="space-y-5 rounded-md border border-accent-gray bg-accent-gray p-8 shadow-sm"
          >
            <div class="space-y-8 text-[18px] font-medium leading-7 text-gray-600">
              <div class="space-y-1 border-b border-gray-600">
                <div class="grid grid-cols-2 font-bold">
                  <p class="mr-2">{{ shared.meta.storyType }}</p>
                  <span class="text-right">{{ chapter.number }}</span>
                </div>
                <div class="grid grid-cols-2">
                  <p class="mr-2">Created</p>
                  <span class="text-right">{{ formatDate(chapter.createdAt) }}</span>
                </div>
                <div class="grid grid-cols-2">
                  <p class="mr-2">Last Published</p>
                  <span class="text-right">{{ formatDate(chapter.updatedAt) }}</span>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col items-center justify-between space-y-4 xl:flex-row xl:space-y-0"
            >
              <!-- class="inline-flex w-full items-center justify-center rounded-md border-2 border-accent-one bg-transparent px-3 py-2 text-sm font-medium leading-5 text-accent-one hover:opacity-80 hover:shadow-md active:opacity-80" -->
              <button
                type="button"
                class="inline-flex w-full items-center justify-center rounded-full border-2 border-accent-orange bg-transparent px-3 py-2 text-sm font-medium leading-5 text-accent-orange hover:opacity-80 hover:shadow-md active:opacity-80 xl:w-1/3"
                @click.prevent="close"
              >
                Close
              </button>

              <button
                type="button"
                class="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-accent-green px-3 py-2 text-sm font-medium leading-5 text-white hover:opacity-80 hover:shadow-md active:opacity-80 xl:w-1/3"
                @click.prevent="edit"
              >
                <icon name="check-badge" class="mr-1" />Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../Shared/AppLayout.vue';
import { formatDate } from '../Shared/helpers';
import { PreviewProps, SharedPageProps } from '../Shared/interfaces';
import { useSharedStore } from '../store';

const props = defineProps<PreviewProps & SharedPageProps>();

const shared = useSharedStore();
shared.setFromProps(props);

const close = () => {
  window.location.href = '/';
};

const edit = () => {
  window.location.href = `/draft/${props.chapter.number}/edit`;
};
</script>
