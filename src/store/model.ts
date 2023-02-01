import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Scripture } from 'App/Models/Interfaces';

export const useModelStore = defineStore('model', () => {
  const model = ref({});
  const errors: Ref<Record<string, string[]>> = ref({});

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

  const isPopulated = (path: string): boolean => readPath(path) !== undefined;

  const updateVerse = (path: string, verse: string) => {
    const scripture = getField(path, {}) as Scripture;
    scripture.verse = verse;
    setField(path, scripture);
  };

  const updateReference = (path: string, reference: string) => {
    const scripture = getField(path, {}) as Scripture;
    scripture.reference = reference;
    setField(path, scripture);
  };

  return {
    model,
    getField,
    setField,
    updateVerse,
    updateReference,
    addListItem,
    removeListItem,
    setModel,
    setErrors,
    isPopulated,
    errors,
  };
});
