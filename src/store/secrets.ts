import { defineStore } from 'pinia';
import { ref } from 'vue';

const start = {
  cloudinaryApiKey: '',
  cloudinarySecret: '',
  bibleApiKey: '',
  s3AccessKeyId: '',
  s3SecretAccessKey: '',
};

export const useSecretStore = defineStore('secrets', () => {
  const cloudinaryApiKey = ref(start.cloudinaryApiKey);
  const cloudinarySecret = ref(start.cloudinarySecret);
  const bibleApiKey = ref(start.bibleApiKey);
  const s3AccessKeyId = ref(start.s3AccessKeyId);
  const s3SecretAccessKey = ref(start.s3SecretAccessKey);

  const setSecrets = (fresh: any) => {
    const strong = fresh as typeof start;
    cloudinaryApiKey.value = strong.cloudinaryApiKey;
    cloudinarySecret.value = strong.cloudinarySecret;
    bibleApiKey.value = strong.bibleApiKey;
    s3AccessKeyId.value = strong.s3AccessKeyId;
    s3SecretAccessKey.value = strong.s3SecretAccessKey;
  };

  return {
    setSecrets,

    cloudinaryApiKey,
    cloudinarySecret,
    bibleApiKey,
    s3AccessKeyId,
    s3SecretAccessKey,
  };
});
