<template>
  <TranslationAppLayout
    :chapter-title="chapterTitle"
    :has-edit-review="spec.hasEditReview"
    :draft-status="draft.status"
    :meta="meta"
    :language="language"
    :story-name="storyName"
    :stories="stories as string[]"
    :user="props.user"
    @is-single-column="isSingleColumn = $event"
  >
    <section>
      <form class="space-y-8">
        <div v-for="(item, index) in fields" :key="index">
          <component :is="widgetFor(index)" :field="item" :is-nested="false" />
        </div>
      </form>
    </section>
    <section :class="isSingleColumn ? 'hidden' : ''">
      <form class="space-y-8">
        <div v-for="(item, index) in fields" :key="index">
          <component :is="widgetFor(index)" :field="item" :is-nested="false" />
        </div>
      </form>
    </section>
  </TranslationAppLayout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';
import {
  Meta,
  FieldSpec,
  StorySpec,
  Providers,
  User,
  LanguageSpecification,
} from '../Shared/interfaces';
import { useModelStore, useWidgetsStore } from '../store';

import TranslationAppLayout from '../Shared/TranslationAppLayout.vue';

interface Draft {
  id: number;
  number: number;
  status: string;
  updated_at: string;
  created_at: string;
}

const props = defineProps<{
  draft: Draft;
  bundle: any;
  spec: StorySpec;
  fields: FieldSpec[];
  feedback: string | undefined;
  lastPublished: string;
  providers: Providers;
  // shared page props
  meta: Meta;
  user: User;
  storyName: string;
  stories: string[];
  language: LanguageSpecification;
  errors: any;
}>();

interface FeedbackPanel {
  message: string;
  icon: null | string;
}

type postType = { feedback: string | undefined; bundle: any };

const store = useModelStore();
const feedbackPanel = ref<FeedbackPanel>({
  message: '',
  icon: null,
});

const getPayload = (): postType => {
  return {
    feedback: props.feedback,
    bundle: store.model,
  };
};

const publish = () => {
  if (props.user.role === 'admin') {
    router.post(`/draft/${props.draft.id}/publish`, getPayload(), {
      onSuccess: () => {
        feedbackPanel.value.message = `Successfully published.`;
        feedbackPanel.value.icon = 'check-badge';
      },
      onError: () => {
        store.setErrors(props.errors);
        feedbackPanel.value.message = `${props.meta.chapterType} not published. Please review and correct any errors.`;
        feedbackPanel.value.icon = 'exclamation';
      },
    });
  }
};

const chapterTitle = computed(() =>
  props.bundle.title ? props.bundle.title : `New ${props.meta.chapterType}`,
);

const widgets = useWidgetsStore();

if (props.providers) {
  widgets.setProviders(props.providers);
}

const widgetFor = (key: number) => {
  const widget = (props.fields as FieldSpec[])[key].widget;
  return widgets.picker(widget);
};

onMounted(() => {
  console.log(publish);
});

const isSingleColumn = ref(false);
</script>
