import { reactive, readonly } from "vue";

const languages = [
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

interface LanguageSpecification {
  language: string;
  languageDirection: string;
  locale: string;
}

const state: LanguageSpecification = reactive({
  language: languages[0].language,
  languageDirection: languages[0].language,
  locale: languages[0].language,
});

const methods = {
  setLanguage(value: string) {
    state.language = value;
    const language = languages.find((lang) => lang.language == state.language);
    state.languageDirection = language!.languageDirection;
    state.locale = language!.locale;
  },
};

export default {
  state: readonly(state),
  methods,
};
