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
    @delete="deleteDraft"
  >
    <section class="row-subgrid">
      <form class="row-subgrid gap-y-8">
        <div v-for="(item, index) in fields" :key="index" class="grid">
          <component :is="widgetFor(index)" :field="item" :is-nested="false" />
        </div>
      </form>
    </section>
    <section class="row-subgrid" :class="languageStore.isSingleColumn ? 'hidden' : ''">
      <div class="row-subgrid gap-y-8">
        <div v-for="(item, index) in fields" :key="index" class="grid">
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
import { computed, toRefs } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import {
  DraftMeta,
  Meta,
  FieldSpec,
  StorySpec,
  Providers,
  User,
  LanguageSpecification,
} from '../Shared/interfaces';
import {
  useModelStore,
  useWidgetsStore,
  useLanguageStore,
  useSecretStore,
} from '../store';
import TranslationAppLayout from '../Shared/TranslationAppLayout.vue';

interface Bundle {
  title: string;
}

const props = defineProps<{
  draft: DraftMeta;
  bundle: any;
  source: any;
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
  secrets: any;
}>();

// const meta = computed(() => usePage().props.meta as Meta);

// state
const languageStore = useLanguageStore();
const secretStore = useSecretStore();
const store = useModelStore();
const { bundle, errors } = toRefs(props);
store.setModel(bundle.value);
store.setErrors(errors.value);
store.setSource(props.source);
secretStore.setSecrets(props.secrets);

const chapterTitle = computed(() =>
  bundle.value.title ? bundle.value.title : `New Draft`,
);
// props.bundle.title ? props.bundle.title : `New ${props.meta.chapterType}`,

const widgets = useWidgetsStore();

if (props.providers) {
  widgets.setProviders(props.providers);
}

const widgetFor = (key: number) => {
  const widget = (props.fields as FieldSpec[])[key].widget;
  return widgets.picker(widget);
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
</script>
