<template>
  <div class="flex items-center justify-between bg-white px-6 py-3">
    <div class="flex">
      <div class="flex items-center space-x-6">
        <Link href="/">
          <img :src="meta.logo" alt="Logo" class="h-12 w-auto" />
        </Link>
        <Link class="text-3xl font-extrabold leading-9" href="/">{{ meta.name }}</Link>
        <!-- eslint-disable vue/valid-v-model -->
        <DropDown
          v-model="(form.language as string)"
          :options="(languages as string[])"
          :is-read-only="!user.isManager"
          @change="onLanguage"
        ></DropDown>
      </div>
      <div class="flex items-center space-x-6 md:ml-24">
        <ContextMenu
          :options="(stories as string[])"
          :anchor="meta.storyType"
          @select="onStory"
        ></ContextMenu>
        <Link v-if="user.isAdmin" class="px-2 py-3 hover:text-gray-700" href="/page"
          >Pages</Link
        >
        <Link v-if="user.isAdmin" class="px-2 py-3 hover:text-gray-700" href="/user"
          >Users</Link
        >
        <a
          class="inline-block px-2 py-3 hover:text-gray-700"
          :href="meta.helpUrl"
          target="_blank"
          rel="noopener noreferrer"
          >Help
        </a>
      </div>
    </div>
    <div class="flex items-center">
      <div class="ml-6 text-xl font-extrabold">{{ user.name }}</div>
      <Menu as="div" class="relative ml-3">
        <div>
          <MenuButton
            class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="sr-only">Open user menu</span>
            <div
              class="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-accent p-2.5 text-2xl font-extrabold leading-8 text-white"
            >
              {{ user.initials }}
            </div>
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                :class="[
                  active ? 'bg-gray-100' : '',
                  'block w-full px-4 py-2 text-sm text-gray-700',
                ]"
                @click="signOut()"
              >
                Sign out
              </button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';
import { Link, usePage, useForm } from '@inertiajs/vue3';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { LanguageSpecification, Meta, Story } from './interfaces';
import DropDown from './DropDown.vue';
import ContextMenu from './ContextMenu.vue';
import { pinia, useLanguageStore } from '../store';

interface User {
  name: string;
  initials: string;
  email: string;
  isManager: boolean;
  isAdmin: boolean;
}

const languageStore = useLanguageStore(pinia);
const page = usePage();
const user = computed(() => page.props.user as User);
const language = computed(() => page.props.language as LanguageSpecification);
const languages = computed(() => page.props.languages);
const stories = computed(() => page.props.stories);
const story = computed(() => page.props.story as Story);
const meta = computed(() => page.props.meta as Meta);

const form = useForm({
  language: language.value.language,
  story: story.value.name,
});

const onLanguage = async (lang: string) => {
  if (lang === form.language) return;
  form.language = lang;
  form.post(`/switch`);
};

const onStory = async (story: string) => {
  form.story = story;
  form.post(`/switch`);
};

onBeforeMount(() => {
  languageStore.setLanguage(language.value);
});

const signOut = () => (window.location.href = '/logout');
</script>
