<template>
  <Story title="Image Field" id="image-field" group="widgets">
    <Variant title="With model">
      <ImageField :field="spec" :provider="provider" />

      <ModelControl :model="objectModel" />
    </Variant>

    <Variant title="Error" :setup-app="loadData">
      <ImageField
        :field="{
          name: 'profile',
          label: 'Profile Image',
          widget: 'image',
        }"
        :provider="provider"
      />
      <template #controls>
        <ErrorControl :errors="objectErrors" />
      </template>
    </Variant>

    <Variant title="Read Only" :setup-app="loadData">
      <ImageField
        :field="{
          name: 'profile',
          label: 'Profile Image',
          widget: 'image',
          isReadOnly: true,
        }"
        :provider="provider"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import ImageField from "./ImageField.vue";
import ErrorControl from "../helpers/ErrorControl.vue";
import ModelControl from "../helpers/ModelControl.vue";
import { objectErrors, objectModel } from "../helpers/mocks";
import type { Vue3StorySetupHandler } from "@histoire/plugin-vue";
import { useModelStore } from "../store";
import { config } from "../../secrets";
import { ImageProvider } from "@/Interfaces";

const loadData: Vue3StorySetupHandler = ({ app, story, variant }) => {
  const store = useModelStore();
  if (variant?.title == "Read Only") {
    store.model = objectModel;
  }
  if (variant?.title == "Error") {
    store.errors = objectErrors;
  }
};

const spec = {
  name: "profile",
  label: "Profile Image",
  widget: "image",
  uploadPreset: "cmsplayground",
};

const provider: ImageProvider = {
  uploadPreset: "cmsplayground",
  cloudName: "onesheep",
  apiKey: config.cloudinaryApiKey,
  secret: config.cloudinarySecret,
};
</script>
