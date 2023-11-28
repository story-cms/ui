<template>
  <AppLayout>
    <template #header>
      <HeaderBar ref="headerBarComponent" />
    </template>
    <div ref="contentHeaderEl" class="w-full bg-gray-50">
      <ContentHeader
        :title="chapterTitle"
        @delete="deleteDraft"
        @info="info"
        @app-preview="appPreview"
      >
        <WorkflowButtons @request-change="reject" @publish="publish" @submit="submit" />
      </ContentHeader>
    </div>
    <div
      class="container relative mx-auto p-3 lg:grid lg:grid-cols-[1fr_416px] lg:gap-x-9"
    >
      <form class="space-y-8">
        <div v-for="(item, index) in drafts.story.fields" :key="index">
          <component :is="widgetFor(index)" :field="item" :is-nested="false" />
        </div>
      </form>

      <div class="absolute right-2 top-2">
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
            :is-floating="!isLargeScreen"
            :bundle="bundle"
            class="mt-2"
            @close="closeS"
          />
        </section>
        <div
          v-if="feedbackPanel.message"
          class="mt-[24px] overflow-hidden rounded-sm bg-white shadow"
        >
          <div class="flex items-center px-5 py-6">
            <Icon
              v-if="feedbackPanel.icon"
              :name="feedbackPanel.icon"
              class="mr-[18px]"
              :class="{
                'text-red-500': feedbackPanel.icon == 'exclamation',
                'text-blue-500': feedbackPanel.icon == 'check',
                'text-green-500': feedbackPanel.icon == 'check-badge',
                'text-yellow-500': feedbackPanel.icon == 'exclamation-circle',
              }"
            />
            <p class="text-sm font-medium leading-4">{{ feedbackPanel.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import AppLayout from '../Shared/AppLayout.vue';
import HeaderBar from '../Shared/HeaderBar.vue';
import ContentHeader from '../Shared/ContentHeader.vue';
import MetaBox from '../Shared/MetaBox.vue';
import { router } from '@inertiajs/vue3';
import Icon from '../Shared/Icon.vue';
import { padZero, debounce, formatDate } from '../Shared/helpers';
import { FieldSpec, DraftEditProps, SharedPageProps } from '../Shared/interfaces';
import { useDraftsStore, useModelStore, useSharedStore, useWidgetsStore } from '../store';
import { createIntersectionObserver } from '../Shared/helpers';

import MobileAppPreview from './MobileAppPreview.vue';
import WorkflowButtons from '../Draft/WorkflowButtons.vue';

const props = defineProps<DraftEditProps & SharedPageProps>();

const closeS = () => {
  showAppPreview.value = false;
};

const model = useModelStore();
model.setFromProps(props);
const shared = useSharedStore();
shared.setFromProps(props);
const drafts = useDraftsStore();
drafts.setFromProps(props);
const widgets = useWidgetsStore();
widgets.setProviders(props.providers);

interface FeedbackPanel {
  message: string;
  icon: null | string;
}

let isSettingErrors = false;

const feedbackPanel = ref<FeedbackPanel>({
  message: '',
  icon: null,
});

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

const chapterTitle = ref(props.bundle.title ? props.bundle.title : defaultTitle.value);

const save = debounce(2000, () => {
  router.post(`/draft/${props.draft.id}/save`, getPayload(), {
    preserveScroll: true,
    onSuccess: () => {
      widgets.setIsDirty(false);
      // feedbackPanel.value.message = `Episode saved!`;
      // feedbackPanel.value.icon = 'check';
    },
    onError: () => {
      widgets.setIsDirty(false);
      shared.setErrors(props.errors);
      isSettingErrors = true;
      feedbackPanel.value.message = JSON.stringify(props.errors, null, 2);
    },
  });
});

const deleteDraft = () => {
  router.delete(`/draft/${props.draft.id}`, {
    onSuccess: () => {
      feedbackPanel.value.message = `Successfully deleted.`;
    },
    onError: () => {
      feedbackPanel.value.message = `There are errors deleting this chapter.`;
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
      feedbackPanel.value.message = `Successfully published.`;
      feedbackPanel.value.icon = 'check-badge';
    },
    onError: () => {
      widgets.setIsDirty(false);
      shared.setErrors(props.errors);
      feedbackPanel.value.message = `${props.meta.chapterType} not published. Please review and correct any errors.`;
      feedbackPanel.value.icon = 'exclamation';
    },
  });
};

const reject = () => {
  // TODO: feedback
  router.post(`/draft/${props.draft.id}/reject`, getPayload());
};

const showMetaBox = ref(false);
const showAppPreview = ref(false);
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

const appPreview = () => {
  if (isLargeScreen.value) return;
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
  window.addEventListener('resize', handleResize);
  observer.observe(headerBarComponent.value?.navbar as HTMLElement);
});

const widgetFor = (key: number) => {
  const widget = (props.spec.fields as FieldSpec[])[key].widget;
  return widgets.picker(widget);
};

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
