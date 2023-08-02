import './style.css'; // Import global CSS

import { defineSetupVue3 } from '@histoire/plugin-vue';
import { pinia, useSecretStore } from './store';

const secrets = {
  cloudinaryApiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  cloudinarySecret: import.meta.env.VITE_CLOUDINARY_SECRET,
  bibleApiKey: import.meta.env.VITE_BIBLE_API_KEY,
  s3Endpoint: import.meta.env.VITE_S3_ENDPOINT,
  s3AccessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
  s3SecretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
  s3Bucket: import.meta.env.VITE_S3_BUCKET,
  s3Region: import.meta.env.VITE_S3_REGION,
};

const store = useSecretStore(pinia);
store.setSecrets(secrets);

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(pinia);
});
