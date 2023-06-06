import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WidgetPicker } from '../Shared/interfaces';
import { widgetField } from '../Draft/widget-fields';

export const useWidgetsStore = defineStore('widgets', () => {
  const standardPicker = (widget: string) => widgetField(widget);
  let picker = ref<WidgetPicker>(standardPicker);

  const setPicker = (fresh: WidgetPicker) => {
    picker.value = fresh;
  };

  return {
    picker,
    setPicker,
    standardPicker,
  };
});
