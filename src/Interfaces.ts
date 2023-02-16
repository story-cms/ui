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
  fields: Array<object>;
}

export interface FieldSpec {
  name: string;
  label: string;
  widget: string;
  // specialized
  index?: string;
  fields?: FieldSpec[] | FieldMap;
  canFold?: boolean;
  uploadPreset?: string;
  isRow?: boolean;
  provider?: ImageProvider;
  options?: Array<SelectOption>;
  default?: any;
  minimal?: boolean;
  buttons?: string[];
  description?: string;
  extensions?: string[];
  maxSize?: number;
  toolbar?: string[];
}

export interface ImageProvider {
  defaultPreset: string;
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

export interface SelectOption {
  label: string;
  value: string;
}

export interface PageItem {
  order?: number;
  group?: number;
  title?: string;
  icon?: string;
  description?: string;
  body?: string;
  isPublished?: boolean;
}
