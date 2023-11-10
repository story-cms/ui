<template>
  <TranslationAppLayout @delete="deleteDraft">
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
import { router } from '@inertiajs/vue3';
import type { FieldSpec, DraftEditProps, SharedPageProps } from '../Shared/interfaces';
import { useSharedStore, useModelStore, useWidgetsStore, useDraftsStore } from '../store';
import TranslationAppLayout from '../Shared/TranslationAppLayout.vue';

const props = defineProps<DraftEditProps & SharedPageProps>();

// state
useSharedStore().setFromProps(props);
useModelStore().setFromProps(props);
const drafts = useDraftsStore();
drafts.setFromProps(props);
const widgets = useWidgetsStore();
widgets.setProviders(props.providers);

const widgetFor = (key: number) => {
  const widget = (props.spec.fields as FieldSpec[])[key].widget;
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
