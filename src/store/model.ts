import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import config from '../../secrets';
import type { Scripture } from '../Interfaces';
import { parseReference } from '@/Shared/helpers';

export const useModelStore = defineStore('model', () => {
  let model = ref({});
  let errors: Ref<Record<string, string[]>> = ref({});

  const resolvePath = (
    object: Record<string | number, any>,
    path: string,
    defaultValue: Object = {},
  ): Object =>
    path
      .split('.')
      .reduce((o, p) => (o ? (o[p] ? o[p] : defaultValue) : defaultValue), object);

  const setField = (path: string, value: any) => {
    let object = JSON.parse(JSON.stringify(model.value));
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

  const getField = (path: string, defaultValue: Object = {}) =>
    resolvePath(model.value, path, defaultValue);

  const updateVerse = (path: string, verse: string) => {
    const scripture = getField(path, {}) as Scripture;
    scripture.verse = verse;
    setField(path, scripture);
  };

  const setScripture = async (path: string, reference: string) => {
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/passages/${parseReference(
        reference,
      )}?content-type=text`,
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
    errors,
  };
});
