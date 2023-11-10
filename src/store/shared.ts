import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { computed, ref, toRefs } from 'vue';
import { SharedPageProps, Meta, LanguageSpecification, User } from '../Shared/interfaces';

const defaultLanguage: LanguageSpecification = {
  locale: 'en',
  language: 'English',
  languageDirection: 'ltr',
};

export const useSharedStore = defineStore('shared', () => {
  const stories: Ref<string[]> = ref([]);
  const meta: Ref<Meta> = ref({} as Meta);
  const user: Ref<User> = ref({} as User);
  const languages: Ref<LanguageSpecification[]> = ref([] as LanguageSpecification[]);

  const setFromProps = (props: SharedPageProps) => {
    errors.value = toRefs(props.errors) as any;
    stories.value = props.stories;
    meta.value = props.meta;
    languages.value = props.languages;
    user.value = props.user;
    language.value = props.language;
  };

  // errors

  const errors: Ref<Record<string, string[]>> = ref({});

  const setErrors = (fresh: any) => {
    errors.value = fresh;
  };

  const clearErrors = () => {
    errors.value = <Record<string, string[]>>{};
  };

  const errorMessages = (path: string): string[] => {
    if (!errors.value) return [];
    const messages = errors.value[`bundle.${path}`] || [];
    return messages;
  };

  // language

  const KingJamesVersion = 'de4e12af7f28f599-01';
  const language = ref(defaultLanguage);
  const languageDirection = computed(() => language.value.languageDirection);
  const isRtl = computed(() =>
    language.value.languageDirection === 'rtl' ? true : false,
  );
  const locale = computed(() => language.value.locale);
  const bibleVersion = computed(() => language.value.bibleVersion ?? KingJamesVersion);

  const isTranslation = computed(() => language.value.locale !== defaultLanguage.locale);

  const setLanguage = (fresh: LanguageSpecification) => {
    language.value = fresh;
  };

  return {
    stories,
    meta,
    languages,
    errors,
    user,

    language,
    languageDirection,
    locale,
    isRtl,
    bibleVersion,
    isTranslation,
    setLanguage,

    setErrors,
    clearErrors,
    errorMessages,
    setFromProps,
  };
});
