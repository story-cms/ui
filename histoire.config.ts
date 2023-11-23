import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  setupFile: '/src/histoire.setup.ts',
  plugins: [HstVue()],
  viteNodeInlineDeps: [/@aws-sdk/, /@inertiajs/],
  tree: {
    groups: [
      {
        id: 'top',
        title: '', // No toggle
      },
      {
        id: 'widgets',
        title: 'Field Widgets',
      },
      {
        id: 'pages',
        title: 'Pages',
      },
      {
        id: 'chapter',
        title: 'Chapter Index',
      },
      {
        id: 'draft',
        title: 'Drafts',
      },
      {
        id: 'users',
        title: 'Users',
      },
      {
        id: 'shared',
        title: 'Shared Widgets',
      },
    ],
  },
  theme: {
    title: 'Story CMS',
    //   logo: {
    //     square: "./img/square.png",
    //     light: "./img/light.png",
    //     dark: "./img/dark.png",
    //   },
    //   logoHref: "https://acme.com",
    //   favicon: "./favicon.ico",
  },
});
