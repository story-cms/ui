import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

export const useModelStore = defineStore("model", () => {
  let model = reactive({});
  const formModel = computed(() => model);
  const setFormModel = (fresh: Object) => {
    model = fresh;
  };

  // https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arrays-by-string-path
  const resolvePath = (
    object: Record<string | number, any>,
    path: string,
    defaultValue: Object = {},
  ): Object =>
    path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object);

  const setPath = (path: string, value: any) => {
    let object = JSON.parse(JSON.stringify(model));
    path
      .split(".")
      .reduce(
        (o, p, i) =>
          (o[p] = path.split(".").length === ++i ? value : o[p] || {}),
        object,
      );
    model = object;
  };

  const addListItem = (path: string) => {
    const list = resolvePath(model, path) as Array<any>;
    list.push({});
    setPath(path, list);
  };

  return {
    formModel,
    setFormModel,
    addListItem,
  };
});
