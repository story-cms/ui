import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import config from '../../secrets';
import type { Scripture, SecretKeys } from 'App/Models/Interfaces';
import { parseReference } from '../Shared/helpers';

export const useModelStore = defineStore('model', () => {
  const model = ref({});
  const errors: Ref<Record<string, string[]>> = ref({});
  const secrets: Ref<SecretKeys> = ref({
    cloudinaryApiKey: '',
    cloudinarySecret: '',
    bibleApiKey: '',
  });

  const resolvePath = (
    object: Record<string | number, any>,
    path: string,
    defaultValue: object = {},
  ): object =>
    path
      .split('.')
      .reduce((o, p) => (o ? (o[p] ? o[p] : defaultValue) : defaultValue), object);

  const readPath = (path: string): any =>
    path.split('.').reduce((o: Record<string, any>, p) => {
      if (o === undefined) return undefined;
      if (!Object.hasOwn(o, p)) return undefined;
      return o[p];
    }, model.value);

  const setField = (path: string, value: any) => {
    const object = JSON.parse(JSON.stringify(model.value));
    path
      .split('.')
      .reduce(
        (o, p, i) => (o[p] = path.split('.').length === ++i ? value : o[p] || {}),
        object,
      );
    model.value = object;
  };

  const removeListItem = (path: string, index: number) => {
    const list = resolvePath(model.value, path, []) as any[];
    list.splice(index, 1);
    setField(path, list);
  };

  const addListItem = (path: string) => {
    const list = resolvePath(model.value, path, []) as any[];
    list.push({});
    setField(path, list);
  };

  const getField = (path: string, defaultValue: object = {}) =>
    resolvePath(model.value, path, defaultValue);

  const setModel = (fresh: object) => {
    model.value = fresh;
  };

  const setErrors = (fresh: any) => {
    errors.value = fresh;
  };

  const setSecrets = (fresh: any) => {
    secrets.value = fresh;
  };

  const isPopulated = (path: string): boolean => readPath(path) !== undefined;

  const updateVerse = (path: string, verse: string) => {
    const scripture = getField(path, {}) as Scripture;
    scripture.verse = verse;
    setField(path, scripture);
  };

  const setScripture = async (path: string, reference: string) => {
    const code = parseReference(reference);
    if (code === '') return;
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/passages/${code}?content-type=text`,
      {
        headers: {
          accept: 'application/json',
          'api-key': config.bibleApiKey,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    const verse = data.data.content
      .trim()
      .replace(/\[(\d+)\]/g, '\n`$1`')
      .replace(/¶\s/g, '')
      .replace(/^\n/, '');

    setField(path, {
      reference,
      verse,
    });
  };

  return {
    model,
    getField,
    setField,
    setScripture,
    updateVerse,
    addListItem,
    removeListItem,
    setModel,
    setErrors,
    setSecrets,
    isPopulated,
    errors,
    secrets,
  };
});
