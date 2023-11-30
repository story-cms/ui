<template>
  <div class="min-h-screen bg-app_gray">
    <div>
      <HeaderBar />
      <slot></slot>
    </div>
    <MessageCentre
      class="fixed inset-x-0 top-0"
      :class="{ hidden: !shared.hasFeedback }"
      :response="shared.messageCentre.response"
      :message="shared.messageCentre.message"
    />
  </div>
</template>

<script setup lang="ts">
import MessageCentre from './MessageCentre.vue';
import HeaderBar from './HeaderBar.vue';

import { useSharedStore } from '../store';
const shared = useSharedStore();
</script>
