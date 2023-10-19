<template>
  <TranslationAppLayout
    :chapter-title="chapterTitle"
    :has-edit-review="spec.hasEditReview"
    :draft-status="draft.status"
    :meta="meta"
    :story="story"
    :stories="stories as string[]"
    :user="props.user"
  >
    <div
      class="mx-2 grid grid-cols-2 gap-x-2 bg-gray-50 [&>section]:mt-2 [&>section]:rounded [&>section]:bg-white [&>section]:shadow"
    >
      <section>
        <form class="space-y-8">
          <div v-for="(item, index) in fields" :key="index">
            <component :is="widgetFor(index)" :field="item" :is-nested="false" />
          </div>
        </form>
      </section>
      <section>
        <form class="space-y-8">
          <div v-for="(item, index) in fields" :key="index">
            <component :is="widgetFor(index)" :field="item" :is-nested="false" />
          </div>
        </form>
      </section>
    </div>
  </TranslationAppLayout>
</template>

<script setup lang="ts">
import { computed, PropType, ref, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import { Meta, FieldSpec, StorySpec, Providers, Story, User } from '../Shared/interfaces';
import { useModelStore, useWidgetsStore } from '../store';

import TranslationAppLayout from '../Shared/TranslationAppLayout.vue';

interface Draft {
  id: number;
  number: number;
  status: string;
  updated_at: string;
  created_at: string;
}

const props = defineProps({
  user: { type: Object as PropType<User>, required: true },
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

type postType = { feedback: string | undefined; bundle: any };

const page = usePage();
const stories = computed(() => page.props.stories);
const story = computed(() => page.props.story as Story);

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
</script>
