import { PropType } from 'vue';
import { FieldSpec } from '../Shared/interfaces';
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

  isReadOnly: {
    type: Boolean,
    required: false,
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

export const formatDate = (value: string): string => {
  const d = new Date(value);
  return `${padZero(d.getDate())}/${padZero(d.getMonth() + 1)}/${padZero(
    d.getFullYear(),
  )}, ${padZero(d.getHours())}:${padZero(d.getMinutes())}`;
};

export const debounce = <T extends (...args: any[]) => void>( // eslint-disable-line
  wait: number,
  callback: T,
  immediate = false,
) => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function <U>(this: U, ...args: Parameters<typeof callback>) {
    const context = this; // eslint-disable-line
    const later = () => {
      timeout = null;

      if (!immediate) {
        callback.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;

    if (typeof timeout === 'number') {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      callback.apply(context, args);
    }
  };
};

export const parseReference = (reference: string): string => {
  const match = reference
    .trim()
    .toLocaleLowerCase()
    .match(/(\d+)?\s*(\w+)\s*(\d+)(?:\s*[:.]\s*(\d+))?(?:\s*-\s*(\d+))?/);

  if (!match) {
    return '';
  }

  const bookNum = match[1];
  let book = match[2];
  const chapter = match[3];
  const verse = match[4];
  const endVerse = match[5];

  if (bookNum) {
    book = `${bookNum} ${book}`;
  }
  const abbreviation = getAbbreviation(book);

  if (!abbreviation) {
    return '';
  }

  let referenceString = abbreviation;

  referenceString += `.${chapter}`;
  if (verse) {
    referenceString += `.${verse}`;
  }
  if (endVerse) {
    referenceString += `-${abbreviation}.${chapter}.${endVerse}`;
  }

  return referenceString;
};

function getAbbreviation(inputBook: string): string {
  for (const book in BibleBooksMap) {
    if (book === inputBook || BibleBooksMap[book].includes(inputBook)) {
      return BibleBooksMap[book][0].toUpperCase();
    }
  }

  return '';
}
