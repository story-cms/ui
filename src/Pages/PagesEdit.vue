<template>
  <AppLayout>
    <div class="p-4">
      <div class="flex justify-between space-x-8">
        <div class="w-max flex-grow overflow-hidden rounded-sm lg:max-w-[800px]">
          <form class="space-y-8 bg-white py-4">
            <StringField
              :field="{
                name: 'title',
                label: 'Title',
                widget: 'string',
              }"
              :is-nested="true"
              class="px-8"
            />
            <ImageField
              :field="{
                label: 'Menu Icon',
                name: 'icon',
                widget: 'image',
                uploadPreset: 'menuicon',
                description: 'Square svg to 5MB',
                extensions: ['.svg'],
                maxSize: 5662310,
              }"
              :is-nested="true"
              class="px-8"
            />
            <StringField
              :field="{
                name: 'description',
                label: 'Short Description',
                widget: 'string',
              }"
              :is-nested="true"
              class="px-8"
            />
            <SelectField
              :field="{
                label: 'Page Type',
                name: 'type',
                widget: 'select',
                options: [
                  { label: 'Text', value: 'text' },
                  { label: 'Link', value: 'link' },
                ],
                default: 'text',
              }"
              :is-nested="true"
              class="px-8"
            />
            <StringField
              v-if="isLink"
              :field="{
                name: 'body',
                label: 'External Link',
                widget: 'string',
              }"
              :is-nested="true"
              class="px-8"
            />
            <MarkdownField
              v-else
              :field="{
                name: 'body',
                label: 'Body',
                widget: 'markdown',
                toolbar: [
                  'heading',
                  'bold',
                  'italic',
                  'link',
                  'ordered-list',
                  'unordered-list',
                  'quote',
                  'link',
                  '|',
                  'undo',
                  'redo',
                ],
              }"
              :is-nested="true"
              class="px-8"
            />
          </form>
        </div>
        <div class="sticky top-0 h-full w-[416px]">
          <div
            class="space-y-5 rounded-md border border-gray-200 bg-slate-200 p-8 shadow-sm"
          >
            <div class="space-y-8 text-[18px] font-medium leading-7 text-gray-600">
              <div>
                <div class="grid grid-cols-2">
                  <p class="mr-2">Created</p>
                  <span class="text-right">{{
                    formatDate(props.page['createdAt'])
                  }}</span>
                </div>
                <div class="grid grid-cols-2">
                  <p class="mr-2">Auto-saved</p>
                  <span class="text-right">{{ savedAt }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="inline-flex w-1/3 items-center justify-center rounded-full border-2 border-accent-one bg-transparent px-3 py-2 text-sm font-medium leading-5 text-accent-one shadow hover:opacity-80 hover:shadow-md active:opacity-80"
                @click.prevent="deletePage"
              >
                Delete
              </button>
              <div>
                <BooleanField
                  :field="{
                    name: 'isPublished',
                    label: 'Published',
                    widget: 'boolean',
                    default: false,
                    tintColor: 'green-400',
                    labelOrder: 'start',
                  }"
                  :is-nested="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, toRefs } from 'vue';
import AppLayout from '../Shared/AppLayout.vue';
import StringField from '../Draft/StringField.vue';
import ImageField from '../Draft/ImageField.vue';
import { SharedPageProps, PageEditProps } from '../Shared/interfaces';
import SelectField from '../Draft/SelectField.vue';
import MarkdownField from '../Draft/MarkdownField.vue';
import BooleanField from '../Draft/BooleanField.vue';
import { formatDate, debounce } from '../Shared/helpers';
import { useModelStore, useSharedStore, useWidgetsStore } from '../store';
import { router } from '@inertiajs/vue3';
import { DateTime } from 'luxon';

const props = defineProps<PageEditProps & SharedPageProps>();

type RequestPayload = {
  title: string;
  description: string;
  icon: string;
  type: string;
  body: string;
  isPublished: boolean;
};

const { bundle, page } = toRefs(props);
const model = useModelStore();
const shared = useSharedStore();
model.setModel(bundle.value);
shared.setFromProps(props);
shared.clearErrors();
useWidgetsStore().setProviders(props.providers);

const getPayload = (): RequestPayload => {
  const payload = {
    ...model.model,
  } as unknown;

  return payload as RequestPayload;
};

let isSettingErrors = false;

const selection = ref(model.getField('type', 'comment'));
const savedAt = ref(formatDate(page.value['updatedAt']));

const isLink = computed((): boolean => selection.value === 'link');

const save = debounce(1000, () => {
  // clear errors
  isSettingErrors = true;
  shared.clearErrors();

  router.post(`/page/${props.page.id}`, getPayload(), {
    preserveScroll: true,

    onSuccess: () => {
      console.log('! saved');
      savedAt.value = formatDate(DateTime.now().toISO() ?? '');
    },

    onError: (errors) => {
      console.log('! error on save', errors);
      isSettingErrors = true;
      shared.setErrors(errors);
    },
  });
});

const deletePage = () => {
  router.delete(`/page/${props.page.id}`, {});
};

onMounted(() => {
  model.$subscribe(() => {
    // prevent infinite loop
    if (isSettingErrors) {
      isSettingErrors = false;
      return;
    }

    save();
    selection.value = model.getField('type', 'comment');
  });
});
</script>
