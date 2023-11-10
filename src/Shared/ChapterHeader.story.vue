<template>
  <Story title="Chapter Header" group="shared">
    <Variant title="Role Admin">
      <ChapterHeader
        :chapter-title="'John . 01 . God Came to Earth'"
        :has-edit-review="spec.hasEditReview"
        :draft-status="spec.draftStatus"
        :user="user"
      />
    </Variant>
    <Variant title="Role Editor">
      <ChapterHeader
        :chapter-title="'John . 01 . God Came to Earth'"
        :has-edit-review="spec.hasEditReview"
        :draft-status="spec.draftStatus"
        :user="{
          name: 'John Doe',
          initials: 'JD',
          email: 'john@example.com',
          isManager: true,
          isAdmin: true,
          role: 'editor',
        }"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ChapterHeader from './ChapterHeader.vue';
import { user } from '../helpers/mocks';

const spec = {
  hasEditReview: true,
  draftStatus: 'submitted',
  userRole: 'admin',
};
</script>
