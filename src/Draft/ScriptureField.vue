<template>
  <div
    :class="{
      'box-shadow-sm rounded border border-gray-200 bg-white p-8': !isNested,
      'mt-4': isNested,
      rtl: language.isRtl,
    }"
  >
    <label :for="field.label" class="input-label">
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
        :class="{ 'border-error': referenceHasError, 'opacity-50': props.isReadOnly }"
        @input="updateReference"
        @blur="lookup"
      />
      <p v-if="referenceHasError" class="text-sm text-error">
        This field cannot be empty
      </p>
      <label class="input-label mt-4 block">
        {{ field.label + ' Passage' }}
      </label>
      <button class="mr-1 rounded border border-gray-100 p-1" @mousedown="superscript">
        <Icon name="superscript" class="text-gray-500" />
      </button>
      <button class="rounded border border-gray-100 p-1" @mousedown="nonBreakingSpace">
        <Icon name="indent" class="text-gray-500" />
      </button>
      <textarea
        id="mytextarea"
        v-model="verse"
        :readonly="isBusy || props.isReadOnly"
        placeholder="Verse"
        class="input-field mt-2 h-64 text-black"
        :class="{
          'border-error': verseHasError,
          'opacity-50': isBusy || props.isReadOnly,
        }"
        @input="updateVerse"
      ></textarea>
      <p v-if="verseHasError" class="text-sm text-error">This field cannot be empty</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { FieldSpec, Scripture } from '../Shared/interfaces';
import { useLanguageStore, useModelStore, useSecretStore } from '../store';
import { commonProps } from '../Shared/helpers';
import { parseReference } from '../Shared/helpers';
import Icon from '../Shared/Icon.vue';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const startValue = model.getField(fieldPath.value, {
  reference: '',
  verse: '',
}) as Scripture;
const reference = ref(startValue.reference);
const verse = ref(startValue.verse);
const isBusy = ref(false);

const lookup = () => {
  if (verse.value) return;
  isBusy.value = true;
  setScripture(reference.value).then(() => {
    isBusy.value = false;
  });
};

const superscript = () => {
  const txtarea = document.getElementById('mytextarea') as HTMLInputElement;
  const start = txtarea.selectionStart;
  const finish = txtarea.selectionEnd;
  if (start === null || finish === null) return;
  const sel = '`' + txtarea.value.substring(start, finish) + '`';
  txtarea.value =
    txtarea.value.substring(0, start) + sel + txtarea.value.substring(finish);
};

const nonBreakingSpace = () => {
  const txtarea = document.getElementById('mytextarea') as HTMLInputElement;
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
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value) as Scripture;
    reference.value = fresh.reference;
    verse.value = fresh.verse;
  });
});

const referenceHasError = computed(
  () => `bundle.${fieldPath.value}.reference` in model.errors,
);
const verseHasError = computed(() => `bundle.${fieldPath.value}.verse` in model.errors);
const language = useLanguageStore();
const secrets = useSecretStore();

const setScripture = async (reference: string) => {
  const code = parseReference(reference);
  if (code === '') return;
  const response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/passages/${code}?content-type=text`,
    {
      headers: {
        accept: 'application/json',
        'api-key': secrets.bibleApiKey,
      },
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
