<template>
  <div class="flex items-center justify-between bg-white px-6 py-3">
    <div class="flex">
      <div class="flex items-center space-x-6">
        <Link href="/">
          <img :src="shared.meta.logo" alt="Logo" class="h-12 w-auto" />
        </Link>
        <Link class="text-3xl font-extrabold leading-9" href="/">{{
          shared.meta.name
        }}</Link>
        <!-- eslint-disable vue/valid-v-model -->
        <DropDown
          v-if="isMultiLingual"
          v-model="(form.language as string)"
          :options="(shared.languages.map((l) => l.language) as string[])"
          :is-read-only="!shared.user.isManager"
          @change="onLanguage"
        ></DropDown>
      </div>
      <div class="flex items-center space-x-6 md:ml-24">
        <ContextMenu
          :options="(shared.stories as string[])"
          :anchor="shared.meta.storyType"
          @select="onStory"
        ></ContextMenu>
        <Link class="px-2 py-3 hover:text-gray-700" href="/page">Pages</Link>
        <Link
          v-if="shared.user.isAdmin"
          class="px-2 py-3 hover:text-gray-700"
          href="/user"
          >Users</Link
        >
        <a
          v-if="shared.meta.helpUrl"
          class="inline-block px-2 py-3 hover:text-gray-700"
          :href="shared.meta.helpUrl"
          target="_blank"
          rel="noopener noreferrer"
          >Help
        </a>
      </div>
    </div>
    <div class="flex items-center">
      <div class="ml-6 text-xl font-extrabold">{{ shared.user.name }}</div>
      <Menu as="div" class="relative ml-3">
        <div>
          <MenuButton
            class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="sr-only">Open user menu</span>
            <div
              class="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-accent p-2.5 text-2xl font-extrabold leading-8 text-white"
            >
              {{ shared.user.initials }}
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
import { Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import DropDown from './DropDown.vue';
import ContextMenu from './ContextMenu.vue';
import { pinia, useSharedStore } from '../store';

const shared = useSharedStore(pinia);

interface Form {
  language: string | null;
  story: string | null;
}

const form = useForm({
  language: shared.language.language,
  story: null,
} as Form);

const onLanguage = async (lang: string) => {
  if (lang === form.language) return;
  form.language = lang;
  form.story = null;
  form.post(`/switch`);
};

const onStory = async (story: string) => {
  form.story = story;
  form.language = null;
  form.post(`/switch`);
};

const signOut = () => (window.location.href = '/logout');
const isMultiLingual = computed(() => shared.languages.length > 1);
const isMultiStory = computed(() => shared.stories.length > 1);
</script>
