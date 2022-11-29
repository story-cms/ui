<template>
  <div
    class="bg-white w-full p-[36px] relative"
    :class="{ 'bg-gray-400 bg-opacity-30': isHovering }"
    @dragover.prevent="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div v-if="feedback" class="absolute inset-0">
      <p class="rounded-t-md text-center bg-red-500 text-white py-1 text-sm">
        {{ feedback }}
      </p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <svg
        class="mb-2"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02"
          stroke="#9CA3AF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="flex text-sm text-gray-600 leading-5 font-medium">
        <label
          class="relative cursor-pointer bg-white rounded-md font-medium text-al-massira-blue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <span>Upload a file</span>
          <input
            type="file"
            accept="image/*"
            name="upload"
            @change="onSelect"
            class="sr-only"
          />
        </label>
        <p class="pl-1">or drag and drop</p>
      </div>
      <p class="text-xs text-gray-500 leading-4 font-normal">
        PNG, JPG, GIF up to 5MB
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { validateFile } from "../Helpers/formHelpers";
import { ref } from "vue";

export default {
  emits: ["file"],

  setup(_props, { emit }) {
    const isHovering = ref(false);
    const feedback = ref("");

    const onDragEnter = () => (isHovering.value = true);
    const onDragLeave = () => (isHovering.value = false);
    const onDragOver = () => (isHovering.value = true);

    const onDrop = (e) => {
      feedback.value = "";
      isHovering.value = false;
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files;
      const file = files[0];
      try {
        validateFile(file);
        emit("file", file);
      } catch (e) {
        feedback.value = e;
      }
    };

    const onSelect = (e) => {
      feedback.value = "";
      isHovering.value = false;
      let files = e.target.files;
      const file = files[0];
      try {
        validateFile(file);
        emit("file", file);
      } catch (e) {
        feedback.value = e;
      }
    };

    return {
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
      onSelect,
      isHovering,
      feedback,
    };
  },
};
</script>
