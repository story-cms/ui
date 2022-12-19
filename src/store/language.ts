import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { LanguageSpecification } from "../interfaces";

// this will be imported from the StoryCMS config
// hardcoding it for the playground
const languages: Array<LanguageSpecification> = [
  {
    locale: "en",
    language: "English",
    languageDirection: "ltr",
  },
  {
    locale: "ar",
    language: "عربى",
    languageDirection: "rtl",
  },
  {
    locale: "de",
    language: "Deutsch",
    languageDirection: "ltr",
  },
];

export const useLanguageStore = defineStore("language", () => {
  const language = ref(languages[0].language);
  const languageDirection = ref(languages[0].languageDirection);
  const locale = ref(languages[0].locale);

  const setLanguage = (fresh: string) => {
    const found = languages.find((lang) => lang.language === fresh);
    if (!found) return;
    language.value = found.language;
    languageDirection.value = found.languageDirection;
    locale.value = found.locale;
  };

  const isRtl = computed(() =>
    languageDirection.value == "rtl" ? true : false,
  );

  return {
    languages,
    language,
    languageDirection,
    locale,
    setLanguage,
    isRtl,
  };
});
