import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {
  WidgetPicker,
  S3Target,
  Providers,
  ImageProvider,
} from '../Shared/interfaces';
import { widgetField } from '../Draft/widget-fields';

export const useWidgetsStore = defineStore('widgets', () => {
  const standardPicker = (widget: string) => widgetField(widget);
  const picker = ref<WidgetPicker>(standardPicker); // eslint-disable-line

  const setPicker = (fresh: WidgetPicker) => {
    picker.value = fresh;
  };

  let providers: Providers = {
    s3Target: {
      bucket: '',
      region: '',
      endpoint: '',
      folder: '',
    },
    imageProvider: {
      cloudName: '',
      defaultPreset: '',
    },
  };

  const s3Target = (): S3Target => providers.s3Target as S3Target;
  const imageProvider = (): ImageProvider => providers.imageProvider as ImageProvider;
  const setProviders = (fresh: Providers) => {
    providers = fresh;
  };

  const isDirty = ref(false);
  const setIsDirty = (fresh: boolean) => {
    isDirty.value = fresh;
  };

  return {
    picker,
    setPicker,
    standardPicker,

    setProviders,
    s3Target,
    imageProvider,

    isDirty,
    setIsDirty,
  };
});
