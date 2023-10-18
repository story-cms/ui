import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { LanguageSpecification } from '../Shared/interfaces';

// this will be imported from the StoryCMS config
// hardcoding it for the playground
const languages: Array<LanguageSpecification> = [
  {
    locale: 'en',
    language: 'English',
    languageDirection: 'ltr',
    // bibleVersion: '592420522e16049f-01',
  },
  {
    locale: 'ar',
    language: 'عربى',
    languageDirection: 'rtl',
  },
  {
    locale: 'de',
    language: 'Deutsch',
    languageDirection: 'ltr',
    bibleVersion: 'f492a38d0e52db0f-01',
  },
];

export const useLanguageStore = defineStore('language', () => {
  const KingJamesVersion = 'de4e12af7f28f599-01';
  const language = ref(languages[0].language);
  const languageDirection = ref(languages[0].languageDirection);
  const locale = ref(languages[0].locale);
  const bibleVersion = ref(languages[0].bibleVersion ?? KingJamesVersion);

  const setLanguage = (fresh: string) => {
    const found = languages.find((lang) => lang.language === fresh);
    if (!found) return;
    language.value = found.language;
    languageDirection.value = found.languageDirection;
    locale.value = found.locale;
    if (found.bibleVersion) bibleVersion.value = found.bibleVersion;
  };

  const isRtl = computed(() => (languageDirection.value === 'rtl' ? true : false));

  return {
    languages,
    language,
    languageDirection,
    locale,
    setLanguage,
    isRtl,
    bibleVersion,
  };
});
