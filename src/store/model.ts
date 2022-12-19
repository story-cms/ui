import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

export const useModelStore = defineStore("model", () => {
  let model = ref({});
  let errors: Ref<Record<string, string[]>> = ref({});

  const resolvePath = (
    object: Record<string | number, any>,
    path: string,
    defaultValue: Object = {}
  ): Object =>
    path
      .split(".")
      .reduce(
        (o, p) => (o ? (o[p] ? o[p] : defaultValue) : defaultValue),
        object
      );

  const setField = (path: string, value: any) => {
    let object = JSON.parse(JSON.stringify(model.value));
    path
      .split(".")
      .reduce(
        (o, p, i) =>
          (o[p] = path.split(".").length === ++i ? value : o[p] || {}),
        object
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

  return {
    model,
    getField,
    setField,
    addListItem,
    removeListItem,
    errors,
  };
});