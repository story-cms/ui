import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WidgetPicker, Providers } from '../Shared/interfaces';
import { widgetField } from '../Draft/widget-fields';

const defaultProviders: Providers = {
  s3: {
    accessKeyId: '',
    accessKey: '',
    bucket: '',
    region: '',
    endpoint: '',
    folder: '',
  },
  cloudinary: {
    apiKey: '',
    secret: '',
    cloudName: '',
    defaultPreset: '',
  },
  scripture: {
    bibleApiKey: '',
  },
};

export const useWidgetsStore = defineStore('widgets', () => {
  // widget picker

  const standardPicker = (widget: string) => widgetField(widget);
  const picker = ref<WidgetPicker>(standardPicker); // eslint-disable-line

  const setPicker = (fresh: WidgetPicker) => {
    picker.value = fresh;
  };

  // list toggles

  const listToggles = ref<Record<string, boolean[]>>({});
  const setListToggles = (path: string, value: boolean[]): void => {
    const fresh = { ...listToggles.value };
    fresh[path] = value;
    listToggles.value = fresh;
  };
  const getListToggles = (path: string): boolean[] => listToggles.value[path] || [];

  // providers

  const providers = ref<Providers>(defaultProviders);
  const setProviders = (fresh: Providers) => {
    providers.value = fresh;
  };

  // length of items in list
  const sizeOfItems = ref([{}]);

  const setSizeOfItems = (fresh: object[]) => {
    sizeOfItems.value = fresh.map((item, index) => ({
      index: index,
      size: Object.keys(item).length,
    }));
  };

  const isDirty = ref(false);
  const setIsDirty = (fresh: boolean) => {
    isDirty.value = fresh;
  };

  return {
    picker,
    setPicker,
    standardPicker,

    getListToggles,
    setListToggles,

    setSizeOfItems,
    sizeOfItems,

    setProviders,
    providers,

    isDirty,
    setIsDirty,
  };
});
