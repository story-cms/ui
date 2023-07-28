import './style.css'; // Import global CSS

import { defineSetupVue3 } from '@histoire/plugin-vue';
import { pinia, useSecretStore } from './store';

const secrets = {
  cloudinaryApiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  cloudinarySecret: import.meta.env.VITE_CLOUDINARY_SECRET,
  bibleApiKey: import.meta.env.VITE_BIBLE_API_KEY,
  doEndpoint: import.meta.env.VITE_DO_ENDPOINT,
  doAccessKeyId: import.meta.env.VITE_DO_ACCESS_KEY_ID,
  doSecretAccessKey: import.meta.env.VITE_DO_SECRET_ACCESS_KEY,
  doBucket: import.meta.env.VITE_DO_BUCKET,
  doRegion: import.meta.env.VITE_DO_REGION,
};

const store = useSecretStore(pinia);
store.setSecrets(secrets);

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(pinia);
});
