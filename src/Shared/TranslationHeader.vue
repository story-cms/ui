<template>
  <div class="flex items-center justify-between p-6">
    <h2 class="text-2xl/8 font-semibold">{{ props.chapterTitle }}</h2>
    <div class="flex space-x-6">
      <button
        type="submit"
        class="w-32 rounded-[38px] border-gray-200 bg-white px-[15px] py-[9px] text-sm/5 font-medium text-gray-600 shadow"
      >
        Meta
      </button>
      <button
        type="submit"
        class="w-32 rounded-[38px] border-gray-200 bg-white px-[15px] py-[9px] text-sm/5 font-medium text-gray-600 shadow"
      >
        App Preview
      </button>
      <button
        v-if="
          (!props.hasEditReview || props.draftStatus === 'submitted') &&
          props.userRole === 'admin'
        "
        type="submit"
        class="w-32 rounded-[38px] border-gray-200 bg-green-500 px-[15px] py-[9px] text-sm/5 font-bold text-white shadow"
      >
        Publish
      </button>
    </div>
  </div>
  <div
    class="grid grid-cols-2 gap-x-2 [&>h3]:pb-2 [&>h3]:pl-6 [&>h3]:text-lg/8 [&>h3]:font-semibold [&>h3]:text-gray-800"
  >
    <h3>Afrikaans</h3>
    <h3>
      English
      <span>
        <icon name="eyeoff" class="h-8 w-8 text-black" @click.prevent="toggle"
      /></span>
    </h3>
    <hr class="col-span-full" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  chapterTitle: {
    type: String,
    required: true,
  },
  hasEditReview: {
    type: Boolean,
    required: true,
  },
  draftStatus: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['toggle']);

const toggle = () => {
  emit('toggle');
};
</script>
