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
}

export interface S3Target {
  bucket: string;
  region: string;
  endpoint: string;
}

export interface Providers {
  s3Target?: S3Target;
  imageProvider?: ImageProvider;
}

export interface Audio {
  url: string;
  length: number;
}

export interface Bundle {
  audio: Audio;
  soundtrack: Audio;
}

export interface Draft {
  id: number;
  api_version: number;
  locale: string;
  number: number;
  bundle: Bundle;
  story_id: number;
  feedback: null;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface FieldsClass {
  passage: Comment;
  comment: Comment;
  prayer: PrayerElement;
}

export interface PrayerElement {
  widget: Widget;
  fields?: PurpleField[] | FieldsClass;
  label?: string;
  name?: string;
  minimal?: boolean;
  toolbar?: any[];
}

export interface Comment {
  label: string;
  name: Name;
  widget: Widget;
}

export type Name = 'comment' | 'passage';

export type Widget = 'panel' | 'object' | 'markdown' | 'scripture';

export interface PurpleField {
  label: string;
  name: string;
  widget: string;
  description?: string;
  extensions?: string[];
  uploadPreset?: string;
  provider?: Provider;
  maxSize?: number;
  toolbar?: any[];
}

export interface Provider {
  defaultPreset: string;
  cloudName: string;
}

export interface Secrets {
  cloudinaryApiKey: string;
  cloudinarySecret: string;
  s3AccessKeyId: string;
  s3SecretAccessKey: string;
}

export interface Spec {
  chapterLimit: number;
  hasEditReview: boolean;
  fields: PrayerElement[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  remember_me_token: null;
  reset_token: null;
  reset_token_created_at: null;
  role: string;
  language: string;
  created_at: Date;
  updated_at: Date;
  isManager: boolean;
  isAdmin: boolean;
  initials: string;
}
