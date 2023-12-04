<template>
  <TranslationAppLayout
    :chapter-title="chapterTitle"
    :show-side-bar="showSideBar"
    @delete="deleteDraft"
    @submit="submitDraft"
    @publish="publishDraft"
    @request-change="reject"
    @info="info"
    @app-preview="appPreview"
  >
    <section
      class="row-subgrid"
      :class="{
        'mx-auto w-full max-w-[1080px]': drafts.isSingleColumn,
        'row-subgrid': !drafts.isSingleColumn,
      }"
    >
      <form
        :class="{
          'row-subgrid gap-y-8': !drafts.isSingleColumn,
          'grid grid-cols-1 gap-y-2': drafts.isSingleColumn,
        }"
      >
        <div
          v-for="(item, index) in spec.fields"
          :key="index"
          class="grid grid-rows-[subgrid]"
          :style="{ gridRow: `span ${spec.fields.length}` }"
        >
          <component :is="widgetFor(index)" :field="item" :is-nested="false" />
        </div>
      </form>
    </section>
    <section class="row-subgrid" :class="drafts.isSingleColumn ? 'hidden' : ''">
      <div class="row-subgrid gap-y-8">
        <div
          v-for="(item, index) in spec.fields"
          :key="index"
          class="grid grid-rows-[subgrid]"
          :style="{ gridRow: `span ${spec.fields.length}` }"
        >
          <component
            :is="widgetFor(index)"
            :field="item"
            :is-nested="false"
            :is-read-only="true"
          />
        </div>
      </div>
    </section>
    <div
      :class="{
        'right-4': !isLargeScreen || !showSideBar,
        'absolute block': shared.isIntersecting,
        'container fixed inset-x-0 mx-auto': !shared.isIntersecting && !showSideBar,
        'sticky top-24  grid [align-self:start]': isLargeScreen && drafts.isSingleColumn,
      }"
    >
      <div
        :class="{
          'absolute right-4 top-10': !shared.isIntersecting && !showSideBar,
          'mt-11': !shared.isIntersecting && showSideBar,
        }"
      >
        <section v-if="showMetaBox">
          <MetaBox
            :class="{ 'w-[407px]': !showSideBar }"
            :created-at="props.draft.createdAt"
            :updated-at="props.draft.updatedAt"
            :story-type="props.meta.storyType"
            :chapter-type="metaChapter"
            :published-when="published_when"
            :is-floating="!isLargeScreen || !drafts.isSingleColumn"
            @close="showMetaBox = false"
          />
        </section>
        <section
          v-if="showAppPreview"
          class="mt-6"
          :class="{ 'mt-14': showSideBar && !showMetaBox }"
        >
          <MobileAppPreview
            v-if="bundle"
            :is-floating="!isLargeScreen || !drafts.isSingleColumn"
            :bundle="bundle"
            class="mt-2"
            @close="showAppPreview = false"
          />
        </section>
      </div>
    </div>
  </TranslationAppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import type { Errors } from '@inertiajs/core';
import type { FieldSpec, DraftEditProps, SharedPageProps } from '../Shared/interfaces';
import { ResponseStatus } from '../Shared/interfaces';
import { useSharedStore, useModelStore, useWidgetsStore, useDraftsStore } from '../store';
import TranslationAppLayout from '../Shared/TranslationAppLayout.vue';
import MetaBox from '../Shared/MetaBox.vue';
import MobileAppPreview from './MobileAppPreview.vue';
import { debounce, padZero, formatDate, safeChapterTitle } from '../Shared/helpers';

const props = defineProps<DraftEditProps & SharedPageProps>();

// state
useSharedStore().setFromProps(props);
useModelStore().setFromProps(props);
const drafts = useDraftsStore();
drafts.setFromProps(props);

const widgets = useWidgetsStore();
widgets.setProviders(props.providers);
const shared = useSharedStore();
const model = useModelStore();

const defaultTitle = computed(() => {
  return `New ${props.meta.chapterType}`;
});

const title = ref(props.bundle.title);

const chapterTitle = computed(() => {
  if (title.value === defaultTitle.value) return defaultTitle.value;
  return (
    safeChapterTitle(title.value, props.storyName, props.draft.number) ??
    defaultTitle.value
  );
});

const widgetFor = (key: number) => {
  const widget = (props.spec.fields as FieldSpec[])[key].widget;
  return widgets.picker(widget);
};

const metaChapter = computed(
  () => `${padZero(props.draft.number)} of ${padZero(props.spec.chapterLimit)}`,
);

const published_when = computed(() => {
  return props.lastPublished == '' ? 'Unpublished' : formatDate(props.lastPublished);
});

const getPayload = () => {
  return {
    feedback: '',
    bundle: model.model,
  };
};

// actions
const onSuccess = (message?: string) => {
  widgets.setIsDirty(false);
  if (!message) return;

  shared.addMessage(ResponseStatus.Confirmation, message);
};

const onError = (errors: Errors, message: string) => {
  widgets.setIsDirty(false);
  console.log(errors);
  isSettingErrors = true;
  shared.setErrors(props.errors);
  shared.addMessage(ResponseStatus.Failure, message);
};

const deleteDraft = () => {
  router.delete(`/draft/${props.draft.id}`, {
    onSuccess: () => onSuccess('Draft successfully deleted'),
    onError: (e) => onError(e, 'Error deleting draft'),
  });
};

let isSettingErrors = false;

const saveDraft = debounce(2000, () => {
  router.post(`/draft/${props.draft.id}/save`, getPayload(), {
    preserveScroll: true,
    onSuccess: () => onSuccess(),
    onError: (e) => onError(e, 'Error saving draft.'),
  });
});

const submitDraft = () => {
  router.post(`/draft/${props.draft.id}/submit`, getPayload(), {
    preserveScroll: true,
    onSuccess: () => onSuccess(`${props.meta.chapterType} submitted for review`),
    onError: (e) =>
      onError(e, 'Draft not submitted. Please review and correct any errors.'),
  });
};

const publishDraft = () => {
  if (props.user.role !== 'admin') return;
  widgets.setIsDirty(true);

  router.post(`/draft/${props.draft.id}/publish`, getPayload(), {
    preserveScroll: true,
    onSuccess: () => onSuccess('Draft successfully published.'),
    onError: (e) =>
      onError(e, 'Draft not published. Please review and correct any errors.'),
  });
};

const reject = () => {
  router.post(`/draft/${props.draft.id}/reject`, getPayload(), {
    preserveScroll: true,
    onSuccess: () => onSuccess('Draft sent back for fixing.'),
    onError: (e) => onError(e, 'Draft could not be sent back.'),
  });
};

const showMetaBox = ref(false);
const showAppPreview = ref(false);

const isLargeScreen = computed(() => {
  return shared.isLargeScreen;
});

const showSideBar = computed(() => {
  return (
    shared.isLargeScreen &&
    (showMetaBox.value || showAppPreview.value) &&
    drafts.isSingleColumn
  );
});

const info = () => {
  showMetaBox.value = !showMetaBox.value;
};

const appPreview = () => {
  showAppPreview.value = !showAppPreview.value;
};

onMounted(() => {
  model.$subscribe(() => {
    if (isSettingErrors) {
      isSettingErrors = false;
      return;
    }
    widgets.setIsDirty(true);
    title.value = model.getField('title', defaultTitle.value);
    saveDraft();
  });
});
</script>
