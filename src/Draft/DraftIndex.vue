<template>
  <AppLayout>
    <template #header>
      <HeaderBar ref="headerBarComponent" />
    </template>
    <div ref="contentHeaderEl" class="w-full bg-gray-50">
      <ContentHeader
        class="px-3"
        :title="chapterTitle"
        @delete="deleteDraft"
        @info="info"
        @app-preview="appPreview"
      >
        <WorkflowButtons @request-change="reject" @publish="publish" @submit="submit" />
      </ContentHeader>
    </div>
    <div
      class="container relative mx-auto px-3"
      :class="{
        'grid grid-cols-[1fr,_416px] gap-x-8 ': isLargeScreen,
        'mx-auto grid max-w-[1080px] grid-cols-[1fr] ':
          !isLargeScreen || (!showMetaBox && !showAppPreview),
      }"
    >
      <form class="space-y-8">
        <div v-for="(item, index) in drafts.story.fields" :key="index">
          <component :is="widgetFor(index)" :field="item" :is-nested="false" />
        </div>
      </form>

      <div
        :class="{
          'absolute right-0 top-0': !isLargeScreen,
          'sticky top-24  [align-self:start]': isLargeScreen,
        }"
      >
        <section v-if="showMetaBox">
          <MetaBox
            :created-at="props.draft.createdAt"
            :updated-at="props.draft.updatedAt"
            :story-type="props.meta.storyType"
            :chapter-type="metaChapter"
            :published-when="published_when"
            :is-floating="!isLargeScreen"
            @close="showMetaBox = false"
          />
        </section>
        <section v-if="showAppPreview" class="mt-6">
          <MobileAppPreview
            v-if="bundle"
            :is-floating="!isLargeScreen"
            :bundle="bundle"
            class="mt-2"
            @close="showAppPreview = false"
          />
        </section>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import AppLayout from '../Shared/AppLayout.vue';
import HeaderBar from '../Shared/HeaderBar.vue';
import ContentHeader from '../Shared/ContentHeader.vue';
import MetaBox from '../Shared/MetaBox.vue';
import { router } from '@inertiajs/vue3';
import { padZero, debounce, formatDate } from '../Shared/helpers';
import {
  FieldSpec,
  DraftEditProps,
  SharedPageProps,
  ResponseStatus,
} from '../Shared/interfaces';
import { useDraftsStore, useModelStore, useSharedStore, useWidgetsStore } from '../store';
import { createIntersectionObserver } from '../Shared/helpers';

import MobileAppPreview from './MobileAppPreview.vue';
import WorkflowButtons from '../Draft/WorkflowButtons.vue';

const props = defineProps<DraftEditProps & SharedPageProps>();

const model = useModelStore();
model.setFromProps(props);
const shared = useSharedStore();
shared.setFromProps(props);
const drafts = useDraftsStore();
drafts.setFromProps(props);
const widgets = useWidgetsStore();
widgets.setProviders(props.providers);

let isSettingErrors = false;

type postType = { feedback: string | undefined; bundle: any };

const getPayload = (): postType => {
  return {
    feedback: '',
    bundle: model.model,
  };
};

const defaultTitle = computed(() => {
  return `New ${props.meta.chapterType}`;
});

const chapterTitle = ref(
  props.bundle.title
    ? `${props.storyName} <span>.</span> ${padZero(
        props.draft.number,
      )} <span>.</span> ${props.bundle.title.replace(/</g, '&lt;')}`
    : defaultTitle.value,
);

const save = debounce(2000, () => {
  router.post(`/draft/${props.draft.id}/save`, getPayload(), {
    preserveScroll: true,
    onSuccess: () => {
      widgets.setIsDirty(false);
    },
    onError: () => {
      widgets.setIsDirty(false);
      shared.setErrors(props.errors);
      isSettingErrors = true;
      shared.addMessage(
        ResponseStatus.Failure,
        `${props.meta.chapterType} not saved. Please review and correct any errors.`,
      );
    },
  });
});

const deleteDraft = () => {
  router.delete(`/draft/${props.draft.id}`, {
    onSuccess: () => {
      shared.addMessage(ResponseStatus.Accomplishment, 'Successfully deleted.');
    },
    onError: () => {
      shared.addMessage(
        ResponseStatus.Failure,
        'There are errors deleting this chapter.',
      );
    },
  });
};

const submit = () => {
  router.post(`/draft/${props.draft.id}/submit`, getPayload());
};

const publish = () => {
  if (props.user.role !== 'admin') return;
  widgets.setIsDirty(true);
  router.post(`/draft/${props.draft.id}/publish`, getPayload(), {
    onSuccess: () => {
      widgets.setIsDirty(false);
      shared.addMessage(
        ResponseStatus.Confirmation,
        `${props.meta.chapterType} published successfully.`,
      );
    },
    onError: () => {
      widgets.setIsDirty(false);
      shared.setErrors(props.errors);
      shared.addMessage(
        ResponseStatus.Failure,
        `${props.meta.chapterType} not published. Please review and correct any errors.`,
      );
    },
  });
};

const reject = () => {
  // TODO: feedback
  router.post(`/draft/${props.draft.id}/reject`, getPayload());
};

const showMetaBox = ref(true);
const showAppPreview = ref(true);

const isLargeScreen = computed(() => {
  return shared.isLargeScreen;
});

watch([showMetaBox, showAppPreview, isLargeScreen], ([a, b, c]) => {
  if (c) {
    showMetaBox.value = a;
    showAppPreview.value = b;
  }
});

const info = () => {
  showMetaBox.value = !showMetaBox.value;
};

const appPreview = () => {
  showAppPreview.value = !showAppPreview.value;
};
const published_when = computed(() => {
  return props.lastPublished == '' ? 'Unpublished' : formatDate(props.lastPublished);
});

const metaChapter = computed(
  () => `${padZero(props.draft.number)} of ${padZero(props.spec.chapterLimit)}`,
);

const headerBarComponent = ref<typeof HeaderBar | null>(null);

const contentHeaderEl = ref<HTMLElement | null>(null);

const observer = createIntersectionObserver(contentHeaderEl);

onMounted(() => {
  model.$subscribe(() => {
    if (isSettingErrors) {
      isSettingErrors = false;
      return;
    }
    widgets.setIsDirty(true);
    save();
    chapterTitle.value = model.getField('title', '') || defaultTitle.value;
  });
  observer.observe(headerBarComponent.value?.navbar as HTMLElement);
});

const widgetFor = (key: number) => {
  const widget = (props.spec.fields as FieldSpec[])[key].widget;
  return widgets.picker(widget);
};
</script>
