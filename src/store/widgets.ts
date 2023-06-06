import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WidgetPicker } from '../Shared/interfaces';
import { widgetField } from '../Draft/widget-fields';

export const useWidgetsStore = defineStore('widgets', () => {
  const standardPicker = (widget: string) => widgetField(widget);
  const picker = ref<WidgetPicker>(standardPicker); // eslint-disable-line

  const setPicker = (fresh: WidgetPicker) => {
    picker.value = fresh;
  };

  return {
    picker,
    setPicker,
    standardPicker,
  };
});
