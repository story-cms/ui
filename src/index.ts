import IndexCard from './Chapters/IndexCard.vue';
import StatusTag from './Chapters/StatusTag.vue';

import AnimationField from './Draft/AnimationField.vue';
import AudioField from './Draft/AudioField.vue';
import ImageField from './Draft/ImageField.vue';
import BooleanField from './Draft/BooleanField.vue';
import ListField from './Draft/ListField.vue';
import MarkdownField from './Draft/MarkdownField.vue';
import NullField from './Draft/NullField.vue';
import NumberField from './Draft/NumberField.vue';
import ObjectField from './Draft/ObjectField.vue';
import PanelField from './Draft/PanelField.vue';
import ScriptureField from './Draft/ScriptureField.vue';
import SelectField from './Draft/SelectField.vue';
import StringField from './Draft/StringField.vue';
// import { widgetField } from './Draft/widget-fields';

import IndexFilter from './Shared/IndexFilter.vue';
import ContextMenu from './Shared/ContextMenu.vue';
import DropDown from './Shared/DropDown.vue';
import AddItemButton from './Shared/AddItemButton.vue';
import Icon from './Shared/Icon.vue';
import PublicLayout from './Shared/PublicLayout.vue';

import PageIndexItem from './Pages/PageIndexItem.vue';

import Login from './Auth/AuthLogin.vue';
import ForgotPassword from './Auth/ForgotPassword.vue';
import ResetPassword from './Auth/ResetPassword.vue';
import DashboardIndex from './Dashboard/DashboardIndex.vue';
import DraftIndex from './Draft/DraftIndex.vue';
import PagesIndex from './Pages/PagesIndex.vue';
import PagesEdit from './Pages/PagesEdit.vue';
import UsersIndex from './Users/UsersIndex.vue';
import ChapterPreview from './Chapters/ChapterPreview.vue';

export * from './store/index';
export * from './Shared/helpers';
export * from './Shared/interfaces';
export * from './Draft/Attachments/types';
export * from './Draft/Attachments/cloudinary-service';
export * from './Draft/Attachments/s3-service';

import { createInertiaApp } from '@inertiajs/vue3';

export {
  createInertiaApp,
  // chapters
  IndexCard,
  StatusTag,
  // drafts
  AnimationField,
  AudioField,
  ImageField,
  BooleanField,
  ListField,
  MarkdownField,
  NullField,
  NumberField,
  ObjectField,
  PanelField,
  ScriptureField,
  SelectField,
  StringField,
  // widgetField,
  // pages
  PageIndexItem,
  // shared
  ContextMenu,
  DropDown,
  IndexFilter,
  AddItemButton,
  Icon,
  PublicLayout,
  // auth
  Login,
  ForgotPassword,
  ResetPassword,
  DashboardIndex,
  DraftIndex,
  PagesIndex,
  PagesEdit,
  UsersIndex,
  ChapterPreview,
};
