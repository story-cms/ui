<template>
  <div class="max-w-[416px] bg-gray-200 p-8 font-['Inter'] text-lg/7 font-medium">
    <section class="grid grid-cols-2">
      <p>Created</p>
      <span class="text-right">{{ formatDate(props.createdAt) }}</span>
    </section>
    <section class="grid grid-cols-2">
      <p>Auto-saved</p>
      <span class="text-right">{{ formatDate(props.savedAt) }}</span>
    </section>
    <section class="grid grid-cols-2">
      <p>Published</p>
      <span class="text-right font-bold uppercase">{{ props.publishedAt }}</span>
    </section>
  </div>
</template>
<script setup lang="ts">
import { PageMeta } from '../Shared/interfaces';
import { formatDate } from '../Shared/helpers';

const props = defineProps<
  Pick<PageMeta, 'createdAt' | 'updatedAt'> & {
    savedAt: string;
    publishedAt: string;
  }
>();
</script>
