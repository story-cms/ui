import './style.css'; // Import global CSS

import { defineSetupVue3 } from '@histoire/plugin-vue';
import { pinia, useSecretStore } from './store';

const secrets = {
  cloudinaryApiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  cloudinarySecret: import.meta.env.VITE_CLOUDINARY_SECRET,
  bibleApiKey: import.meta.env.VITE_BIBLE_API_KEY,
};

const store = useSecretStore(pinia);
store.setSecrets(secrets);

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(pinia);
});
