<template>
  <AppLayout>
    <div class="container relative mx-auto px-3">
      <h2>Micro Copy Status</h2>
      <section class="flex flex-col space-y-6">
        <div v-for="item in progress" :key="item.locale">
          <h3>{{ item.language }}</h3>
          <pre>{{ JSON.stringify(item, null, 4) }}</pre>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../Shared/AppLayout.vue';
import { useSharedStore } from '../store';
import { UiIndexProps, SharedPageProps } from '../Shared/interfaces';

const props = defineProps<SharedPageProps & UiIndexProps>();

const shared = useSharedStore();
shared.setFromProps(props);
</script>
