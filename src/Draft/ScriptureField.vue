<template>
  <div
    :class="{
      'rounded-bl-lg rounded-br-lg bg-white px-8 py-6 shadow-sm': !isNested,
      rtl: language.isRtl,
    }"
  >
    <label :for="fieldPath" class="input-label">
      {{ field.label }}
    </label>
    <div class="mt-[2px] pt-1 sm:col-span-2 sm:mt-0">
      <input
        :id="fieldPath"
        v-model="reference"
        type="text"
        :name="field.label"
        :readonly="field.isReadOnly"
        placeholder="John 1 or John 1:3-4"
        autocomplete="given-name"
        class="input-field"
        :class="{ 'border-error': referenceHasError, 'opacity-50': field.isReadOnly }"
        @blur="lookup"
      />
      <p v-if="referenceHasError" class="text-sm text-error">
        This field cannot be empty
      </p>
      <textarea
        v-model="verse"
        :readonly="isBusy"
        placeholder="Verse"
        class="input-field mt-2 h-64"
        :class="{ 'border-error': verseHasError, 'opacity-50': isBusy }"
        @input="updateVerse"
      ></textarea>
      <p v-if="verseHasError" class="text-sm text-error">This field cannot be empty</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { FieldSpec, Scripture } from 'App/Models/Interfaces';
import { useLanguageStore, useModelStore } from '../store';
import { commonProps } from '../Shared/helpers';

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
  model.setScripture(fieldPath.value, reference.value).then(() => {
    isBusy.value = false;
  });
};

const updateVerse = () => {
  model.updateVerse(fieldPath.value, verse.value);
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
</script>

<!-- 
{
  label: 
  name: 
  widget: 'scripture'
  isReadOnly: true | false 
}
 -->
