import { defineStore } from 'pinia';
import { ref } from 'vue';

const start = {
  cloudinaryApiKey: '',
  cloudinarySecret: '',
  bibleApiKey: '',
  s3Endpoint: '',
  s3AccessKeyId: '',
  s3SecretAccessKey: '',
  s3Bucket: '',
  s3Region: '',
};

export const useSecretStore = defineStore('secrets', () => {
  const cloudinaryApiKey = ref(start.cloudinaryApiKey);
  const cloudinarySecret = ref(start.cloudinarySecret);
  const bibleApiKey = ref(start.bibleApiKey);
  const s3Endpoint = ref(start.s3Endpoint);
  const s3AccessKeyId = ref(start.s3AccessKeyId);
  const s3SecretAccessKey = ref(start.s3SecretAccessKey);
  const s3Bucket = ref(start.s3Bucket);
  const s3Region = ref(start.s3Region);

  const setSecrets = (fresh: any) => {
    const strong = fresh as typeof start;
    cloudinaryApiKey.value = strong.cloudinaryApiKey;
    cloudinarySecret.value = strong.cloudinarySecret;
    bibleApiKey.value = strong.bibleApiKey;
    s3Endpoint.value = strong.s3Endpoint;
    s3AccessKeyId.value = strong.s3AccessKeyId;
    s3SecretAccessKey.value = strong.s3SecretAccessKey;
    s3Bucket.value = strong.s3Bucket;
    s3Region.value = strong.s3Region;
  };

  return {
    setSecrets,

    cloudinaryApiKey,
    cloudinarySecret,
    bibleApiKey,
    s3Endpoint,
    s3AccessKeyId,
    s3SecretAccessKey,
    s3Bucket,
    s3Region,
  };
});
