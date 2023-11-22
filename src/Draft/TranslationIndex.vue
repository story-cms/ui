<template>
  <TranslationAppLayout
    @delete="deleteDraft"
    @submit="submitDraft"
    @publish="publishDraft"
    @request-change="reject"
    @info="info"
  >
    <div v-if="showMetaBox" class="absolute right-2 z-10">
      <MetaBox
        :created-at="draft.createdAt"
        :updated-at="draft.updatedAt"
        :story-type="meta.storyType"
        :chapter-type="metaChapter"
        :published-when="published_when"
        @close="showMetaBox = false"
      />
    </div>
    <section class="row-subgrid">
      <form class="row-subgrid gap-y-8">
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
  </TranslationAppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import type { Errors } from '@inertiajs/core';
import type { FieldSpec, DraftEditProps, SharedPageProps } from '../Shared/interfaces';
import { useSharedStore, useModelStore, useWidgetsStore, useDraftsStore } from '../store';
import TranslationAppLayout from '../Shared/TranslationAppLayout.vue';
import MetaBox from '../Shared/MetaBox.vue';
import { debounce, padZero, formatDate } from '../Shared/helpers';

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

console.log('Published', published_when.value);

interface FeedbackPanel {
  message: string;
  icon: null | string;
}

const feedbackPanel = ref<FeedbackPanel>({
  message: '',
  icon: null,
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

  feedbackPanel.value.message = message;
};

const onError = (errors: Errors, message: string) => {
  widgets.setIsDirty(false);
  console.log(errors);
  isSettingErrors = true;
  shared.setErrors(props.errors);
  feedbackPanel.value.message = message;
};

const deleteDraft = () => {
  router.delete(`/draft/${props.draft.id}`, {
    onSuccess: () => onSuccess('Draft successfully deleted.'),
    onError: (e) => onError(e, 'Error deleting draft.'),
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
    onSuccess: () => onSuccess('Draft successfully submitted.'),
    onError: (e) =>
      onError(e, 'Draft not submitted. Please review and correct any errors.'),
  });
};

const publishDraft = () => {
  if (props.user.role !== 'admin') return;
  widgets.setIsDirty(true);

  router.post(`/draft/${props.draft.id}/publish`, getPayload(), {
    preserveScroll: true,
    onSuccess: () => onSuccess('Draft successfully submitted.'),
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

const info = () => {
  showMetaBox.value = !showMetaBox.value;
};

onMounted(() => {
  model.$subscribe(() => {
    if (isSettingErrors) {
      isSettingErrors = false;
      return;
    }
    widgets.setIsDirty(true);
    saveDraft();
  });
});
</script>
