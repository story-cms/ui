<template>
  <div
    :class="{
      'rounded-bl-lg rounded-br-lg bg-white px-8 py-6 shadow-sm': !isNested,
      rtl: language.isRtl,
    }"
  >
    <label :for="field.label" class="input-label">
      {{ field.label + ' Reference' }}
    </label>
    <div class="mt-[2px] pt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        :name="field.label"
        :readonly="field.isReadOnly"
        placeholder="John 1 or John 1:3-4"
        autocomplete="given-name"
        :value="reference"
        @blur="update"
        class="input-field"
        :class="{ 'border-error': hasError, 'opacity-50': field.isReadOnly }"
      />
      <p class="text-sm text-error" v-if="hasError">This field cannot be empty</p>
      <label :for="field.label" class="input-label mt-4 block">
        {{ field.label + ' Passage' }}
      </label>
      <textarea
        :readonly="field.isReadOnly"
        ref="textArea"
        placeholder="Verse"
        :value="verse"
        @input="updateVerse"
        class="input-field mt-2 h-64"
        :class="{ 'border-error': hasError, 'opacity-50': field.isReadOnly }"
      ></textarea>
      <p class="text-sm text-error" v-if="hasError">This field cannot be empty</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue';
import type { Ref } from 'vue';
import { FieldSpec, Scripture } from 'App/Models/Interfaces';
import { useLanguageStore, useModelStore } from '../store';
import { commonProps } from '../shared/helpers';

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const startValue = model.getField(fieldPath.value, '') as Scripture;
const reference = ref(startValue.reference);
const verse = ref(startValue.verse);
let textArea: Ref = ref(null);

const makeTextAreaReadOnly = (readonly: Boolean) => {
  if (readonly) {
    textArea.value.classList.add('opacity-50');
    textArea.value.readonly = true;
  }
  if (!readonly) {
    textArea.value.classList.remove('opacity-50');
    textArea.value.readonly = false;
  }
};

watch(verse, (newValue) => {
  if (newValue) {
    makeTextAreaReadOnly(false);
    textArea.value.focus();
  }
});

const update = (event: Event) => {
  makeTextAreaReadOnly(true);
  model.setScripture(fieldPath.value, (event.target as HTMLInputElement).value);
};

const updateVerse = (event: Event) => {
  model.updateVerse(fieldPath.value, (event.target as HTMLInputElement).value);
};

model.$subscribe(() => {
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value, '') as Scripture;
    reference.value = fresh.reference;
    verse.value = fresh.verse;
  });
});

const hasError = computed(() => `bundle.${fieldPath.value}` in model.errors);
const language = useLanguageStore();
</script>

<!-- 
{
  label: 
  name: 
  widget: 'scripture'
  isReadOnly: true | false 
}
 -->
