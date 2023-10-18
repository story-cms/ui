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
  reference: string;
  part: number;
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
  hasAppPreview: boolean;
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
  isRow?: boolean;
  uploadPreset?: string;
  options?: Array<SelectOption>;
  default?: any;
  minimal?: boolean;
  toolbar?: string[];
  description?: string;
  extensions?: string[];
  maxSize?: number;
  tintColor?: string;
  labelOrder?: string;
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
  bibleVersion?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface TabItem {
  label: string;
  count: number;
}

// used for editing the pages
export interface PageItem {
  id: number;
  group?: number;
  title?: string;
  icon?: string;
  description?: string;
  body?: string;
  isPublished?: boolean;
  isDivider?: boolean;
}

export interface Story {
  id: number;
  name: string;
  fields: Array<object>;
  chapterLimit: number;
  parts?: Array<object>;
}

export interface Part {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export type WidgetPicker = (widget: string) => any; // eslint-disable-line

export interface Meta {
  name: string;
  logo: string;
  storyType: string;
  chapterType: string;
  helpUrl: string;
}

export interface S3Target {
  bucket: string;
  region: string;
  endpoint: string;
  folder?: string;
}

export interface Providers {
  s3Target?: S3Target;
  imageProvider?: ImageProvider;
}

export interface Audio {
  url: string;
  length: number;
}
