import { PropType } from "vue";
import { FieldSpec } from "../interfaces";

export const isPrimitive = (widget: string): boolean =>
  ["string", "markdown", "image"].some((val) => val === widget);

export const dynamicPrimitive = (widget: string): string => {
  if (!isPrimitive(widget)) return "NullField";

  const up = widget[0].toUpperCase() + widget.substr(1);
  return `${up}Field`;
};

export const dynamicWidget = (widget: string): string => {
  const up = widget[0].toUpperCase() + widget.substring(1);
  return `${up}Field`;
};

export const commonProps = {
  field: {
    type: Object as PropType<FieldSpec>,
    required: true,
  },

  rootPath: {
    type: String,
    required: false,
  },

  isNested: {
    type: Boolean,
    default: false,
  },
};

export const addField = (
  event: Event,
  form: Record<string, any>,
  key: string,
) => {
  event.preventDefault();
  form[key].push({});
};

export const removeField = (
  event: Event,
  form: Record<string, any>,
  key: string,
  index: number,
) => {
  event.preventDefault();
  form[key].splice(index, 1);
};

export const padZero = (value: number): string =>
  value > 9 ? `${value}` : `0${value}`;

export const validateFile = (file: File) => {
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".svg"];

  if (!allowedExtensions.some((extension) => file["name"].endsWith(extension)))
    throw new Error(`Invalid file! Use an image instead.`);

  if (file["size"] > 5662310) throw new Error(`File size is too large.`);
};
