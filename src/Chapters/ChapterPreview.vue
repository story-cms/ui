<template>
  <AppLayout>
    <ContentHeader :title="chapterTitle" @info="info" @app-preview="appPreview">
      <button
        type="button"
        class="w-32 rounded-[38px] border border-blue-500 bg-blue-500 px-[15px] py-[9px] text-sm/5 font-medium text-white shadow"
        @click.prevent="edit"
      >
        Edit
      </button>
    </ContentHeader>

    <div
      class="container relative mx-auto px-3"
      :class="{
        'grid grid-cols-[1fr,_416px] gap-x-8 ': isLargeScreen,
        'mx-auto grid max-w-[1080px] grid-cols-[1fr] ':
          !isLargeScreen || (!showMetaBox && !showAppPreview),
      }"
    >
      <!-- eslint-disable vue/no-v-html -->
      <div class="-ml-8 border-s bg-white p-8 shadow-sm" v-html="bundleView"></div>

      <div
        :class="{
          'right-4': !isLargeScreen,
          'absolute block': shared.isIntersecting,
          'fixed right-4 top-24': !shared.isIntersecting && !isLargeScreen,
          'sticky top-24  [align-self:start]': isLargeScreen,
        }"
      >
        <section v-if="showMetaBox">
          <MetaBox
            :created-at="props.chapter.createdAt"
            :updated-at="props.chapter.updatedAt"
            :story-type="props.meta.storyType"
            :chapter-type="metaChapter"
            :published-when="publishedWhen"
            :is-floating="!isLargeScreen"
            :story-name="storyName"
            @close="showMetaBox = false"
          />
        </section>
        <section v-if="meta.hasAppPreview && showAppPreview" class="mt-6">
          <MobileAppPreview
            v-if="bundle"
            :is-floating="!isLargeScreen"
            :bundle="bundle"
            class="mt-2"
            @close="showAppPreview = false"
          />
        </section>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import AppLayout from '../Shared/AppLayout.vue';
import ContentHeader from '../Shared/ContentHeader.vue';
import MetaBox from '../Shared/MetaBox.vue';
import MobileAppPreview from '../Draft/MobileAppPreview.vue';
import { formatDate, padZero, safeChapterTitle } from '../Shared/helpers';
import { PreviewProps, SharedPageProps } from '../Shared/interfaces';
import { useSharedStore } from '../store';

const props = defineProps<PreviewProps & SharedPageProps>();

const shared = useSharedStore();
shared.setFromProps(props);

const chapterTitle =
  safeChapterTitle(props.title, props.storyName, props.chapter.number) ??
  `New ${props.meta.chapterType}`;

const showMetaBox = ref(true);
const showAppPreview = ref(true);

const isLargeScreen = computed(() => {
  return shared.isLargeScreen;
});

watch([showMetaBox, showAppPreview, isLargeScreen], ([a, b, c]) => {
  if (c) {
    showMetaBox.value = a;
    showAppPreview.value = b;
  }
});

const publishedWhen = computed(() => {
  return props.chapter.updatedAt == ''
    ? 'Unpublished'
    : formatDate(props.chapter.updatedAt);
});

const metaChapter = computed(
  () => `${padZero(props.chapter.number)} of ${padZero(props.chapterLimit)}`,
);

const info = () => {
  console.info('info');
  showMetaBox.value = !showMetaBox.value;
};

const appPreview = () => {
  console.info('app-preview');
  showAppPreview.value = !showAppPreview.value;
};

// const close = () => {
//   window.location.href = '/';
// };

const edit = () => {
  window.location.href = `/draft/${props.chapter.number}/edit`;
};

onMounted(() => {
  shared.meta.hasAppPreview
    ? (showAppPreview.value = true)
    : (showAppPreview.value = false);
});
</script>
