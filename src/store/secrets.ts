import { defineStore } from 'pinia';
import { ref } from 'vue';

const start = {
  cloudinaryApiKey: '',
  cloudinarySecret: '',
  bibleApiKey: '',
  doAccessKeyId: '',
  doSecretAccessKey: '',
  doBucket: '',
  doRegion: '',
};

export const useSecretStore = defineStore('secrets', () => {
  const cloudinaryApiKey = ref(start.cloudinaryApiKey);
  const cloudinarySecret = ref(start.cloudinarySecret);
  const bibleApiKey = ref(start.bibleApiKey);
  const doAccessKeyId = ref(start.doAccessKeyId);
  const doSecretAccessKey = ref(start.doSecretAccessKey);
  const doBucket = ref(start.doBucket);
  const doRegion = ref(start.doRegion);

  const setSecrets = (fresh: any) => {
    const strong = fresh as typeof start;
    cloudinaryApiKey.value = strong.cloudinaryApiKey;
    cloudinarySecret.value = strong.cloudinarySecret;
    bibleApiKey.value = strong.bibleApiKey;
    doAccessKeyId.value = strong.doAccessKeyId;
    doSecretAccessKey.value = strong.doSecretAccessKey;
    doBucket.value = strong.doBucket;
    doRegion.value = strong.doRegion;
  };

  return {
    setSecrets,

    cloudinaryApiKey,
    cloudinarySecret,
    bibleApiKey,
    doAccessKeyId,
    doSecretAccessKey,
    doBucket,
    doRegion,
  };
});
