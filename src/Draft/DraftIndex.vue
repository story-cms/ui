<template>
  <AppLayout>
    <div class="flex items-center justify-between p-6">
      <h3 class="mb-[14px] text-lg font-bold leading-7 text-black">
        {{ chapterTitle }}
      </h3>
      <HeaderControls
        @delete="deleteDraft"
        @submit="submit"
        @publish="publish"
        @request-change="reject"
        @info="info"
        @app-preview="appPreview"
      />
    </div>
    <div class="mb-32 px-4 pb-4">
      <div class="flex justify-between space-x-8">
        <div class="w-max flex-grow overflow-hidden rounded-sm lg:max-w-[800px]">
          <form class="space-y-8">
            <div v-for="(item, index) in drafts.story.fields" :key="index">
              <component :is="widgetFor(index)" :field="item" :is-nested="false" />
            </div>
          </form>
        </div>
        <div class="sticky top-0 h-full w-[416px]">
          <section v-if="showMetaBox">
            <MetaBox
              :created-at="props.draft.createdAt"
              :updated-at="props.draft.updatedAt"
              :story-type="props.meta.storyType"
              :chapter-type="metaChapter"
              :published-when="published_when"
              @close="showMetaBox = false"
            />
          </section>
          <section v-if="showAppPreview" class="mt-6">
            <p class="text-center font-['Inter'] text-lg/7 font-medium">Draft Preview</p>
            <MobileAppPreview
              v-if="shared.meta.hasAppPreview"
              :bundle="bundle"
              class="mt-2"
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
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import AppLayout from '../Shared/AppLayout.vue';
import HeaderControls from '../Shared/HeaderControls.vue';
import MetaBox from '../Shared/MetaBox.vue';
import { router } from '@inertiajs/vue3';
import Icon from '../Shared/Icon.vue';
import { padZero, debounce, formatDate } from '../Shared/helpers';
import { FieldSpec, DraftEditProps, SharedPageProps } from '../Shared/interfaces';
import { useDraftsStore, useModelStore, useSharedStore, useWidgetsStore } from '../store';
import MobileAppPreview from './MobileAppPreview.vue';

const props = defineProps<DraftEditProps & SharedPageProps>();

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

const chapterTitle = computed(() =>
  props.bundle.title ? props.bundle.title : `New ${props.meta.chapterType}`,
);

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

onMounted(() => {
  model.$subscribe(() => {
    if (isSettingErrors) {
      isSettingErrors = false;
      return;
    }
    widgets.setIsDirty(true);
    save();
  });
});

const widgetFor = (key: number) => {
  const widget = (props.spec.fields as FieldSpec[])[key].widget;
  return widgets.picker(widget);
};
</script>
