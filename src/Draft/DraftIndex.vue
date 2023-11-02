<template>
  <AppLayout>
    <div class="mb-32 p-4">
      <h3 class="mb-[14px] text-lg font-bold leading-7 text-black">{{ chapterTitle }}</h3>
      <div class="flex justify-between space-x-8">
        <div class="w-max flex-grow overflow-hidden rounded-sm lg:max-w-[800px]">
          <form class="space-y-8">
            <div v-for="(item, index) in fields" :key="index">
              <component :is="widgetFor(index)" :field="item" :is-nested="false" />
            </div>
          </form>
        </div>
        <div class="sticky top-0 h-full w-[416px]">
          <div
            class="space-y-5 rounded-md border border-accent-gray bg-accent-gray p-8 shadow-sm"
          >
            <div class="space-y-8 text-[18px] font-medium leading-7 text-gray-600">
              <div class="space-y-1 border-b border-gray-600">
                <div class="grid grid-cols-2 font-bold">
                  <p class="mr-2">{{ meta.storyType }}</p>
                  <span class="text-right">{{ story }}</span>
                </div>
                <div class="grid grid-cols-2 font-bold">
                  <p class="mr-2">{{ meta.chapterType }}</p>
                  <span class="text-right">{{ metaChapter }}</span>
                </div>
                <div class="grid grid-cols-2">
                  <p class="mr-2">Last Published</p>
                  <span class="text-right">{{ published_when }}</span>
                </div>
              </div>
              <div>
                <div class="grid grid-cols-2">
                  <p class="mr-2">Draft Created</p>
                  <span class="text-right">{{ formatDate(draft['created_at']) }}</span>
                </div>
                <div class="grid grid-cols-2">
                  <p class="mr-2">Draft Saved</p>
                  <span class="text-right">{{ formatDate(draft['updated_at']) }}</span>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col items-center justify-between space-y-4 xl:flex-row xl:space-y-0"
            >
              <button
                v-if="spec.hasEditReview && draft.status == 'submitted'"
                type="submit"
                class="group relative flex justify-center rounded-md border border-transparent bg-red-500 text-sm font-medium text-white hover:bg-red-500/75 hover:opacity-80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:ring-offset-2 active:opacity-80"
                @click.prevent="reject"
              >
                Request Change
              </button>
              <button
                v-if="spec.hasEditReview && draft.status === 'started'"
                type="submit"
                class="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-accent-green px-3 py-2 text-sm font-medium leading-5 text-white hover:opacity-80 hover:shadow-md active:opacity-80 xl:w-1/3"
                @click.prevent="submit"
              >
                Submit
              </button>

              <!-- class="inline-flex w-full items-center justify-center rounded-md border-2 border-accent-one bg-transparent px-3 py-2 text-sm font-medium leading-5 text-accent-one hover:opacity-80 hover:shadow-md active:opacity-80" -->
              <button
                type="submit"
                class="inline-flex w-full items-center justify-center rounded-full border-2 border-accent-orange bg-transparent px-3 py-2 text-sm font-medium leading-5 text-accent-orange hover:opacity-80 hover:shadow-md active:opacity-80 xl:w-1/3"
                @click.prevent="deleteDraft"
              >
                Delete Draft
              </button>

              <button
                v-if="showPublishButton"
                type="submit"
                class="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-accent-green px-3 py-2 text-sm font-medium leading-5 text-white hover:opacity-80 hover:shadow-md active:opacity-80 xl:w-1/3"
                @click.prevent="publish"
              >
                <Icon name="check-badge" class="mr-1" />Publish
              </button>
            </div>
          </div>
          <FlutterPreview v-if="spec.hasAppPreview" :bundle="bundle" class="mt-2" />
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
import { PropType, computed, ref, onMounted, toRefs } from 'vue';
import AppLayout from '../Shared/AppLayout.vue';
import { router, usePage } from '@inertiajs/vue3';
import Icon from '../Shared/Icon.vue';
import { padZero, debounce, formatDate } from '../Shared/helpers';
import { Meta, FieldSpec, StorySpec, Providers } from '../Shared/interfaces';
import { useModelStore, useSecretStore, useWidgetsStore } from '../store';
import FlutterPreview from './FlutterPreview.vue';

interface Draft {
  id: number;
  number: number;
  status: string;
  updated_at: string;
  created_at: string;
}

const props = defineProps({
  user: { type: Object, required: true },
  draft: {
    type: Object as PropType<Draft>,
    required: true,
  },

  bundle: {
    type: Object,
    required: true,
  },

  spec: {
    type: Object as PropType<StorySpec>,
    required: true,
  },

  fields: {
    type: Array as PropType<FieldSpec[]>,
    required: true,
  },

  errors: {
    type: Object,
    default: () => ({}),
  },

  feedback: {
    type: String,
    required: false,
    default: undefined,
  },

  lastPublished: {
    type: String,
    required: true,
  },

  meta: {
    type: Object as PropType<Meta>,
    required: true,
  },

  providers: {
    type: Object as PropType<Providers>,
    required: true,
  },
});

interface FeedbackPanel {
  message: string;
  icon: null | string;
}

let isSettingErrors = false;
const secrets = useSecretStore();
const store = useModelStore();
const widgets = useWidgetsStore();

const { bundle, errors } = toRefs(props);
store.setModel(bundle.value);
store.setErrors(errors.value);
secrets.setSecrets(usePage().props.secrets);

const feedbackPanel = ref<FeedbackPanel>({
  message: '',
  icon: null,
});

const showPublishButton = computed(() => {
  if (widgets.isDirty) return false;
  if (props.user.role !== 'admin') return false;

  return !props.spec.hasEditReview || props.draft.status === 'submitted';
});

const story = computed(() => usePage().props.storyName as string);

type postType = { feedback: string | undefined; bundle: any };

const getPayload = (): postType => {
  return {
    feedback: props.feedback,
    bundle: store.model,
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
      store.setErrors(props.errors);
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
      store.setErrors(props.errors);
      feedbackPanel.value.message = `${props.meta.chapterType} not published. Please review and correct any errors.`;
      feedbackPanel.value.icon = 'exclamation';
    },
  });
};

const reject = () => {
  // TODO: feedback
  router.post(`/draft/${props.draft.id}/reject`, getPayload());
};

const published_when = computed(() => {
  return props.lastPublished == '' ? 'Unpublished' : formatDate(props.lastPublished);
});

const metaChapter = computed(
  () => `${padZero(props.draft.number)} of ${padZero(props.spec.chapterLimit)}`,
);

onMounted(() => {
  store.$subscribe(() => {
    if (isSettingErrors) {
      isSettingErrors = false;
      return;
    }
    widgets.setIsDirty(true);
    save();
  });
});

if (props.providers) {
  widgets.setProviders(props.providers);
}

const widgetFor = (key: number) => {
  const widget = (props.fields as FieldSpec[])[key].widget;
  return widgets.picker(widget);
};
</script>
