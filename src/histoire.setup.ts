import './style.css'; // Import global CSS

import { defineSetupVue3 } from '@histoire/plugin-vue';
import { pinia, useSecretStore, useWidgetsStore } from './store';

const secrets = {
  cloudinaryApiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  cloudinarySecret: import.meta.env.VITE_CLOUDINARY_SECRET,
  bibleApiKey: import.meta.env.VITE_BIBLE_API_KEY,
  s3AccessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
  s3SecretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
};

const store = useSecretStore(pinia);
store.setSecrets(secrets);

const widgets = useWidgetsStore(pinia);
widgets.setProviders({
  s3Target: {
    bucket: import.meta.env.VITE_S3_BUCKET,
    region: import.meta.env.VITE_S3_REGION,
    endpoint: import.meta.env.VITE_S3_ENDPOINT,
  },
  imageProvider: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    defaultPreset: import.meta.env.VITE_CLOUDINARY_PRESET,
  },
});

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(pinia);
});
