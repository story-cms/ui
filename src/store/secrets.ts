import { defineStore } from 'pinia';
import { ref } from 'vue';

// this will be different in a VITA instance
// ------------------------------------------
const start = {
  cloudinaryApiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  cloudinarySecret: import.meta.env.VITE_CLOUDINARY_SECRET,
  bibleApiKey: import.meta.env.VITE_BIBLE_API_KEY,
};
// ------------------------------------------

export const useSecretStore = defineStore('secrets', () => {
  const cloudinaryApiKey = ref(start.cloudinaryApiKey);
  const cloudinarySecret = ref(start.cloudinarySecret);
  const bibleApiKey = ref(start.bibleApiKey);

  const setSecrets = (fresh: any) => {
    const strong = fresh as typeof start;
    cloudinaryApiKey.value = strong.cloudinaryApiKey;
    cloudinarySecret.value = strong.cloudinarySecret;
    bibleApiKey.value = strong.bibleApiKey;
  };

  return {
    setSecrets,

    cloudinaryApiKey,
    cloudinarySecret,
    bibleApiKey,
  };
});
