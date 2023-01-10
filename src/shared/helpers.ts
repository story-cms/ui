import { PropType } from 'vue';
import { FieldSpec } from '../interfaces';
import { BibleBooksMap } from './bibleBooks';

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

export const padZero = (value: number): string => (value > 9 ? `${value}` : `0${value}`);

export const validateFile = (file: File) => {
  const allowedExtensions = ['.jpeg', '.jpg', '.png', '.svg'];

  if (!allowedExtensions.some((extension) => file['name'].endsWith(extension)))
    throw new Error(`Invalid file! Use an image instead.`);

  if (file['size'] > 5662310) throw new Error(`File size is too large.`);
};

export const parseReference = (reference: string): string => {
  const match = reference.match(/(\w+)\s*(\d+)(?:\s*:\s*(\d+))?(?:\s*-\s*(\d+))?/i);

  if (!match) {
    return '';
  }

  const book = match[1];
  const chapter = match[2];
  const verse = match[3];
  const endVerse = match[4];

  let abbreviation = BibleBooksMap[book.toLowerCase()];

  if (!abbreviation) {
    return '';
  }

  let referenceString = `${abbreviation}.${chapter}`;

  if (verse) {
    referenceString += `.${verse}`;
  }

  if (endVerse) {
    referenceString += `-${abbreviation}.${chapter}.${endVerse}`;
  }

  return referenceString;
};