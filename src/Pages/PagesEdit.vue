<template>
  <AppLayout>
    <template #header>
      <HeaderBar ref="headerBarComponent" />
    </template>
    <div ref="contentHeaderEl" class="w-full bg-gray-50">
      <ContentHeader
        class="container mx-auto max-w-[1068px] px-6"
        :title="title"
        @delete="deletePage"
        @info="info"
      >
        <BooleanField
          :field="{
            name: 'isPublished',
            label: 'Published',
            widget: 'boolean',
            default: false,
            tintColor: 'green-400',
            labelOrder: 'start',
          }"
          :is-nested="true"
        />
      </ContentHeader>
    </div>
    <div
      class="relative max-w-[1068px] px-6 pt-2 lg:mx-auto lg:grid lg:grid-cols-[1fr_416px] lg:gap-x-6"
    >
      <form class="space-y-8 bg-white py-4">
        <StringField
          :field="{
            name: 'title',
            label: 'Title',
            widget: 'string',
          }"
          :is-nested="true"
          class="px-8"
        />
        <ImageField
          :field="{
            label: 'Menu Icon',
            name: 'icon',
            widget: 'image',
            uploadPreset: 'menuicon',
            description: 'Square svg to 5MB',
            extensions: ['.svg'],
            maxSize: 5662310,
          }"
          :is-nested="true"
          class="px-8"
        />
        <StringField
          :field="{
            name: 'description',
            label: 'Short Description',
            widget: 'string',
          }"
          :is-nested="true"
          class="px-8"
        />
        <SelectField
          :field="{
            label: 'Page Type',
            name: 'type',
            widget: 'select',
            options: [
              { label: 'Text', value: 'text' },
              { label: 'Link', value: 'link' },
            ],
            default: 'text',
          }"
          :is-nested="true"
          class="px-8"
        />
        <StringField
          v-if="isLink"
          :field="{
            name: 'body',
            label: 'External Link',
            widget: 'string',
          }"
          :is-nested="true"
          class="px-8"
        />
        <MarkdownField
          v-else
          :field="{
            name: 'body',
            label: 'Body',
            widget: 'markdown',
            toolbar: [
              'heading',
              'bold',
              'italic',
              'link',
              'ordered-list',
              'unordered-list',
              'quote',
              'link',
              '|',
              'undo',
              'redo',
            ],
          }"
          :is-nested="true"
          class="px-8"
        />
      </form>

      <div v-if="showMetaBox" :class="isLargeScreen ? 'block' : 'absolute right-2 top-2'">
        <PageMetaBox
          :created-at="page.createdAt"
          :saved-at="savedAt"
          :updated-at="page.updatedAt"
          :published-at="publishedAt"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, toRefs, watch } from 'vue';
import AppLayout from '../Shared/AppLayout.vue';
import HeaderBar from '../Shared/HeaderBar.vue';
import StringField from '../Draft/StringField.vue';
import ImageField from '../Draft/ImageField.vue';
import { SharedPageProps, PageEditProps } from '../Shared/interfaces';
import SelectField from '../Draft/SelectField.vue';
import MarkdownField from '../Draft/MarkdownField.vue';
import PageMetaBox from './PageMetaBox.vue';
import ContentHeader from '../Shared/ContentHeader.vue';
import BooleanField from '../Draft/BooleanField.vue';

import { formatDate, debounce } from '../Shared/helpers';
import { useModelStore, useSharedStore, useWidgetsStore } from '../store';
import { router } from '@inertiajs/vue3';
import { DateTime } from 'luxon';
import { createIntersectionObserver } from '../Shared/helpers';

const props = defineProps<PageEditProps & SharedPageProps>();

type RequestPayload = {
  title: string;
  description: string;
  icon: string;
  type: string;
  body: string;
  isPublished: boolean;
};

const { bundle, page } = toRefs(props);
const model = useModelStore();
const shared = useSharedStore();
model.setModel(bundle.value);
shared.setFromProps(props);
shared.clearErrors();
useWidgetsStore().setProviders(props.providers);

const getPayload = (): RequestPayload => {
  const payload = {
    ...model.model,
  } as unknown;

  return payload as RequestPayload;
};

let isSettingErrors = false;

const selection = ref(model.getField('type', 'comment'));
const title = ref(model.getField('title', 'Page'));
const isPublished = ref(Boolean(model.getField('isPublished', false)));

const savedAt = ref(page.value['updatedAt']);
const publishedAt = computed(() =>
  isPublished.value ? (page.value['updatedAt'] as string) : 'unpublished',
);

const isLink = computed((): boolean => selection.value === 'link');

const save = debounce(1000, () => {
  // clear errors
  isSettingErrors = true;
  shared.clearErrors();

  router.post(`/page/${props.page.id}`, getPayload(), {
    preserveScroll: true,

    onSuccess: () => {
      savedAt.value = DateTime.now().toISO() ?? '';
    },

    onError: (errors) => {
      console.log('! error on save', errors);
      isSettingErrors = true;
      shared.setErrors(errors);
    },
  });
});

const deletePage = () => {
  router.delete(`/page/${props.page.id}`, {});
};

const showMetaBox = ref(false);
const isLargeScreen = ref(false);

const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowWidth.value >= 1024
    ? (isLargeScreen.value = true)
    : (isLargeScreen.value = false);
};

const info = () => {
  if (isLargeScreen.value) return;
  showMetaBox.value = !showMetaBox.value;
};

watch(isLargeScreen, (newValue) => {
  newValue ? (showMetaBox.value = true) : (showMetaBox.value = false);
});

const headerBarComponent = ref<typeof HeaderBar | null>(null);

const contentHeaderEl = ref<HTMLElement | null>(null);

const observer = createIntersectionObserver(contentHeaderEl);

onMounted(() => {
  model.$subscribe(() => {
    // prevent infinite loop
    if (isSettingErrors) {
      isSettingErrors = false;
      return;
    }

    save();
    selection.value = model.getField('type', 'comment');
    title.value = model.getField('title', 'Page');
    isPublished.value = Boolean(model.getField('isPublished', false));
  });

  if (window.innerWidth >= 1024) {
    showMetaBox.value = true;
  }
  window.addEventListener('resize', handleResize);
  observer.observe(headerBarComponent.value?.navbar as HTMLElement);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
