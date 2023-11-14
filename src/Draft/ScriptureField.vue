<template>
  <div
    :class="{
      'box-shadow-sm rounded border border-gray-200 bg-white p-8': !isNested,
      'mt-4': isNested,
      rtl: shared.isRtl,
    }"
  >
    <label
      :for="field.label"
      class="input-label"
      :class="{ 'text-gray-600': props.isReadOnly }"
    >
      {{ field.label + ' Reference' }}
    </label>
    <div class="mt-[2px] pt-1 sm:col-span-2 sm:mt-0">
      <input
        :id="fieldPath"
        v-model="reference"
        type="text"
        :name="field.label"
        :readonly="props.isReadOnly"
        placeholder="John 1 or John 1:3-4"
        autocomplete="given-name"
        class="input-field text-black"
        :class="{ 'border-error': referenceHasError, 'text-gray-600': props.isReadOnly }"
        @input="updateReference"
        @blur="lookup"
      />
      <p v-if="referenceHasError" class="text-sm text-error">
        This field cannot be empty
      </p>
      <label
        class="input-label mt-4 block"
        :class="{ 'text-gray-600': props.isReadOnly }"
      >
        {{ field.label + ' Passage' }}
      </label>
      <button
        type="button"
        class="mr-1 rounded border border-gray-100 p-1"
        @mousedown="superscript"
      >
        <Icon name="superscript" class="text-gray-500" />
      </button>
      <button
        type="button"
        class="rounded border border-gray-100 p-1"
        @mousedown="nonBreakingSpace"
      >
        <Icon name="indent" class="text-gray-500" />
      </button>
      <textarea
        ref="thetextarea"
        v-model="verse"
        :readonly="isBusy || props.isReadOnly"
        placeholder="Verse"
        class="input-field mt-2 h-64 text-black"
        :class="{
          'border-error': verseHasError,
          'text-gray-600': isBusy || props.isReadOnly,
        }"
        @input="updateVerse"
      ></textarea>
      <p v-if="verseHasError" class="text-sm text-error">This field cannot be empty</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted } from 'vue';
import { FieldSpec, Scripture } from '../Shared/interfaces';
import { useModelStore, useSharedStore, useWidgetsStore } from '../store';
import { commonProps } from '../Shared/helpers';
import { parseReference } from '../Shared/helpers';
import Icon from '../Shared/Icon.vue';

// docs: https://scripture.api.bible/livedocs#/Passages/getPassage
const apiOptions = [
  'content-type=text',
  'include-titles=false',
  // 'include-notes=false', // Include footnotes in content
  // 'include-chapter-numbers=false',
  // 'include-verse-numbers=true',
  // 'include-verse-spans=false', // Include spans that wrap verse numbers and verse text for bible content.
];

const props = defineProps({
  ...commonProps,
});

const model = useModelStore();
const shared = useSharedStore();
const provider = useWidgetsStore().providers.scripture;

const thetextarea = ref(null);
const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const startValue = props.isReadOnly
  ? (model.getSourceField(fieldPath.value, {
      reference: '',
      verse: '',
    }) as Scripture)
  : (model.getField(fieldPath.value, {
      reference: '',
      verse: '',
    }) as Scripture);

const reference = ref(startValue.reference);
const verse = ref(startValue.verse);
const isBusy = ref(false);

const lookup = () => {
  if (verse.value && !shared.isTranslation) return;
  isBusy.value = true;
  setScripture(reference.value).then(() => {
    isBusy.value = false;
  });
};

const superscript = () => {
  if (thetextarea.value === null) return;
  const txtarea = thetextarea.value as unknown as HTMLTextAreaElement;
  const start = txtarea.selectionStart;
  const finish = txtarea.selectionEnd;
  if (start === null || finish === null) return;
  const sel = '`' + txtarea.value.substring(start, finish) + '`';
  txtarea.value =
    txtarea.value.substring(0, start) + sel + txtarea.value.substring(finish);
};

const nonBreakingSpace = () => {
  if (thetextarea.value === null) return;
  const txtarea = thetextarea.value as unknown as HTMLTextAreaElement;
  const start = txtarea.selectionStart;
  const finish = txtarea.selectionEnd;
  if (start === null || finish === null) return;
  const sel = '|' + txtarea.value.substring(start, finish);
  txtarea.value =
    txtarea.value.substring(0, start) + sel + txtarea.value.substring(finish);
};

const updateVerse = () => {
  model.updateVerse(fieldPath.value, verse.value);
};

const updateReference = () => {
  model.updateReference(fieldPath.value, reference.value);
};

model.$subscribe(() => {
  if (props.isReadOnly) return;

  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value) as Scripture;
    reference.value = fresh.reference;
    verse.value = fresh.verse;
  });
});

const referenceHasError = computed(
  () => `bundle.${fieldPath.value}.reference` in shared.errors,
);
const verseHasError = computed(() => `bundle.${fieldPath.value}.verse` in shared.errors);

const lookupTranslatedScripture = () => {
  if (reference.value != '') return;
  if(props.isReadOnly) return;
  const sourceValue = model.getSourceField(fieldPath.value, {
    reference: '',
    verse: '',
  }) as Scripture;
  if (!sourceValue.reference) return;
  if (sourceValue.reference == '') return;
  reference.value = sourceValue.reference;
  lookup();
};

onMounted(async () => {
  if (!reference.value) {
    model.updateReference(fieldPath.value, '');
  }
  if (!verse.value) {
    model.updateVerse(fieldPath.value, '');
  }
  if (shared.isTranslation) {
    lookupTranslatedScripture();
  }
});

type HeadersInit = [string, string][] | Record<string, string> | Headers;

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');
requestHeaders.set('api-key', provider?.bibleApiKey ?? '');

const setScripture = async (reference: string) => {
  const code = parseReference(reference);
  if (code === '') return;
  const query = apiOptions.join('&');
  const response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${shared.bibleVersion}/passages/${code}?${query}`,
    {
      headers: requestHeaders,
    },
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  const verse = data.data.content
    .trim()
    .replace(/\[(\d+)\]/g, '\n`$1`')
    .replace(/¶\s/g, '')
    .replace(/^\n/, '');

  model.setField(fieldPath.value, {
    reference,
    verse,
  });
};
</script>
