export interface Version {
  apiVersion: number;
  storyId: number;
  locale: string;
}

export interface Specifier {
  apiVersion: number;
  storyId: number;
  locale: string;
  number: number;
}

export interface IndexItem {
  number: number;
  imageUrl: string;
  title: string;
}

export interface IndexReadyItem {
  number: number;
  imageUrl: string;
  title: string;
  tags: string[];
}

export interface IndexItems {
  root: Array<IndexItem>;
}

export interface StorySpec {
  chapterLimit: number;
  hasEditReview: boolean;
  fields: Array<Object>;
}

export interface FieldSpec {
  name: string;
  label: string;
  widget: string;
  isReadOnly?: boolean;
  // specialized
  fields?: FieldSpec[] | FieldMap;
  uploadPreset?: string;
  provider?: ImageProvider;
  options?: Array<object>;
  default?: any;
}

export interface ImageProvider {
  secret: string;
  apiKey: string;
  uploadPreset: string;
  cloudName: string;
}

export interface Scripture {
  reference: string;
  verse: string;
}

export interface FieldMap {
  [key: string]: FieldSpec;
}

export interface LanguageSpecification {
  language: string;
  languageDirection: 'rtl' | 'ltr';
  locale: string;
}

export interface SecretKeys {
  cloudinaryApiKey: string;
  cloudinarySecret: string;
  bibleApiKey: string;
}
