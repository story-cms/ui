import { defineStore } from 'pinia';
import { ref } from 'vue';

const start = {
  cloudinaryApiKey: '',
  cloudinarySecret: '',
  doOauthToken: '',
  bibleApiKey: '',
};

export const useSecretStore = defineStore('secrets', () => {
  const cloudinaryApiKey = ref(start.cloudinaryApiKey);
  const cloudinarySecret = ref(start.cloudinarySecret);
  const doOauthToken = ref(start.doOauthToken);
  const bibleApiKey = ref(start.bibleApiKey);

  const setSecrets = (fresh: any) => {
    const strong = fresh as typeof start;
    cloudinaryApiKey.value = strong.cloudinaryApiKey;
    cloudinarySecret.value = strong.cloudinarySecret;
    doOauthToken.value = strong.doOauthToken;
    bibleApiKey.value = strong.bibleApiKey;
  };

  return {
    setSecrets,

    cloudinaryApiKey,
    cloudinarySecret,
    doOauthToken,
    bibleApiKey,
  };
});
