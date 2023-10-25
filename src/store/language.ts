import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { LanguageSpecification } from '../Shared/interfaces';

const _defaultLanguage: LanguageSpecification = {
  locale: 'en',
  language: 'English',
  languageDirection: 'ltr',
};

export const useLanguageStore = defineStore('language', () => {
  const KingJamesVersion = 'de4e12af7f28f599-01';
  const _language = ref(_defaultLanguage);
  const label = computed(() => _language.value.language);
  const languageDirection = computed(() => _language.value.languageDirection);
  const isRtl = computed(() =>
    _language.value.languageDirection === 'rtl' ? true : false,
  );
  const locale = computed(() => _language.value.locale);
  const bibleVersion = computed(() => _language.value.bibleVersion ?? KingJamesVersion);

  const setLanguage = (fresh: LanguageSpecification) => {
    _language.value = fresh;
  };

  const isSingleColumn = ref(false);
  const setSingleColumn = (value: boolean) => {
    isSingleColumn.value = value;
  };

  return {
    label,
    languageDirection,
    locale,
    setLanguage,
    isRtl,
    bibleVersion,
    isSingleColumn,
    setSingleColumn,
  };
});
