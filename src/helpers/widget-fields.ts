import StringField from '../components/StringField.vue';
import MarkdownField from '../components/MarkdownField.vue';
import ImageField from '../components/ImageField.vue';
import NullField from '../components/NullField.vue';
import PanelField from '../components/PanelField.vue';
import ListField from '../components/ListField.vue';
import ObjectField from '../components/ObjectField.vue';

export const widgetField = (widget: string) => {
  const up = widget[0].toUpperCase() + widget.substring(1);
  const name = `${up}Field`;
  switch (name) {
    case 'StringField':
      return StringField;
    case 'ImageField':
      return ImageField;
    case 'MarkdownField':
      return MarkdownField;
    case 'PanelField':
      return PanelField;
    case 'ListField':
      return ListField;
    case 'ObjectField':
      return ObjectField;

    default:
      return NullField;
  }
};
