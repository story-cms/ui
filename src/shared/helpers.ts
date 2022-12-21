import { PropType } from "vue";
import { FieldSpec } from "../interfaces";

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

export const padZero = (value: number): string =>
  value > 9 ? `${value}` : `0${value}`;

export const validateFile = (file: File) => {
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".svg"];

  if (!allowedExtensions.some((extension) => file["name"].endsWith(extension)))
    throw new Error(`Invalid file! Use an image instead.`);

  if (file["size"] > 5662310) throw new Error(`File size is too large.`);
};
