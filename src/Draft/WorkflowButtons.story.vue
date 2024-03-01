<template>
  <Story title="Workflow Buttons" group="draft">
    <Variant title="Admin no review" :setup-app="loadData">
      <WorkflowButtons />
    </Variant>
    <Variant title="Admin has review" :setup-app="loadData">
      <WorkflowButtons />
    </Variant>
    <Variant title="Editor has review" :setup-app="loadData">
      <WorkflowButtons />
    </Variant>
    <Variant title="Editor no review" :setup-app="loadData">
      <WorkflowButtons />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import WorkflowButtons from './WorkflowButtons.vue';
import { useSharedStore, useDraftsStore } from '../store';
import type { Vue3StorySetupHandler } from '@histoire/plugin-vue';
import { sharedProps } from '../helpers/mocks';

const loadData: Vue3StorySetupHandler = ({ variant }) => {
  const shared = useSharedStore();
  const drafts = useDraftsStore();

  shared.setFromProps(sharedProps);
  if (variant?.title == 'Admin no review') {
    shared.meta.hasEditReview = false;
    shared.user.role = 'admin';
  }
  if (variant?.title == 'Admin has review') {
    shared.meta.hasEditReview = true;
    shared.user.role = 'admin';
    drafts.draft.status = 'submitted';
  }
  if (variant?.title == 'Editor no review') {
    shared.meta.hasEditReview = false;
    shared.user.role = 'editor';
  }
  if (variant?.title == 'Editor has review') {
    shared.meta.hasEditReview = true;
    shared.user.role = 'editor';
    drafts.draft.status = 'started';
  }
};
</script>
