<template>
  <TranslationAppLayout
    @delete="deleteDraft"
    @submit="submitDraft"
    @publish="publishDraft"
  >
    <section class="row-subgrid">
      <form class="row-subgrid gap-y-8">
        <div v-for="(item, index) in spec.fields" :key="index" class="grid">
          <component :is="widgetFor(index)" :field="item" :is-nested="false" />
        </div>
      </form>
    </section>
    <section class="row-subgrid" :class="drafts.isSingleColumn ? 'hidden' : ''">
      <div class="row-subgrid gap-y-8">
        <div v-for="(item, index) in spec.fields" :key="index" class="grid">
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
import { ref, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';
import type { FieldSpec, DraftEditProps, SharedPageProps } from '../Shared/interfaces';
import { useSharedStore, useModelStore, useWidgetsStore, useDraftsStore } from '../store';
import TranslationAppLayout from '../Shared/TranslationAppLayout.vue';
import { debounce } from '../Shared/helpers';

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

const deleteDraft = () => {
  router.delete(`/draft/${props.draft.id}`, {
    onSuccess: () => {
      console.log('draft deleted');
    },
    onError: (e) => {
      console.log('error deleting draft', e);
    },
  });
};

let isSettingErrors = false;
const isSaving = ref(false);

const saveDraft = debounce(2000, () => {
  isSaving.value = true;
  router.post(`/draft/${props.draft.id}/save`, getPayload(), {
    preserveScroll: true,
    onError: () => {
      shared.setErrors(props.errors);
      isSettingErrors = true;
      feedbackPanel.value.message = JSON.stringify(props.errors, null, 2);
    },
  });
  isSaving.value = false;
});

const submitDraft = () => {
  router.post(`/draft/${props.draft.id}/submit`, getPayload());
};

const publishDraft = () => {
  if (props.user.role === 'admin') {
    router.post(`/draft/${props.draft.id}/publish`, getPayload(), {
      onSuccess: () => {
        feedbackPanel.value.message = `Successfully published.`;
        feedbackPanel.value.icon = 'check-badge';
      },
      onError: () => {
        shared.setErrors(props.errors);
        feedbackPanel.value.message = `${props.meta.chapterType} not published. Please review and correct any errors.`;
        feedbackPanel.value.icon = 'exclamation';
      },
    });
  }
};

onMounted(() => {
  model.$subscribe(() => {
    if (isSettingErrors) {
      isSettingErrors = false;
      return;
    }
    saveDraft();
  });
});
</script>
