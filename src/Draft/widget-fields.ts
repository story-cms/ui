import StringField from './StringField.vue';
import MarkdownField from './MarkdownField.vue';
import ImageField from './ImageField.vue';
import NullField from './NullField.vue';
import PanelField from './PanelField.vue';
import ListField from './ListField.vue';
import ObjectField from './ObjectField.vue';
import ScriptureField from './ScriptureField.vue';
import BooleanField from './BooleanField.vue';
import SelectField from './SelectField.vue';

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
    case 'ScriptureField':
      return ScriptureField;
    case 'BooleanField':
      return BooleanField;
    case 'SelectField':
      return SelectField;

    default:
      return NullField;
  }
};
