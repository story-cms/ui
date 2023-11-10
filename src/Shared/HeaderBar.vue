<template>
  <nav ref="navbar" class="flex h-24 items-center justify-between bg-white px-6">
    <div class="flex items-center">
      <Link href="/" class="mr-6">
        <img :src="shared.meta.logo" alt="Logo" class="aspect-square h-16 w-auto" />
      </Link>
      <div class="flex items-center space-x-8 py-4">
        <ContextMenu
          :options="(shared.stories as string[])"
          :anchor="shared.meta.storyType"
          @select="onStory"
        ></ContextMenu>
        <Link
          class="px-3 py-2 text-sm/5 font-medium text-gray-600 hover:bg-gray-100"
          href="/page"
          >Pages</Link
        >
        <Link
          v-if="shared.user.isAdmin"
          class="px-3 py-2 text-sm/5 font-medium text-gray-600 hover:bg-gray-100"
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
    <div class="flex items-center space-x-6">
      <p class="text-lg/5 font-extrabold text-gray-600">{{ shared.user.name }}</p>
      <Menu as="div" class="relative">
        <div>
          <MenuButton
            class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="sr-only">Open user menu</span>
            <div
              class="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-accent p-2.5 text-2xl font-extrabold uppercase leading-8 text-white"
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
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { useSharedStore } from '../store';

import ContextMenu from './ContextMenu.vue';

const navbar = ref<HTMLElement | null>(null);

const shared = useSharedStore();
interface Form {
  language: string | null;
  story: string | null;
}

const form = useForm({
  language: null,
  story: null,
} as Form);

// TODO
// const onLanguage = async (lang: string) => {
//   if (lang === form.language) return;
//   form.language = lang;
//   form.story = null;
//   form.post(`/switch`);
// };

const onStory = async (story: string) => {
  form.story = story;
  form.language = null;
  form.post(`/switch`);
};

defineExpose({ navbar });

const signOut = () => (window.location.href = '/logout');
</script>
