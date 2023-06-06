import { defineStore } from 'pinia';
import { ref } from 'vue';

const start = {
  cloudinaryApiKey: '',
  cloudinarySecret: '',
  bibleApiKey: '',
};

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
