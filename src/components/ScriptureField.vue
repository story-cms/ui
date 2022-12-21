<template>
  <div
    :class="{
      'rounded-bl-lg rounded-br-lg bg-white px-8 py-6 shadow-sm': !isNested,
      rtl: language.isRtl,
    }"
  >
    <label :for="field.label" class="input-label">
      {{ field.label }}
    </label>
    <div class="mt-[2px] pt-1 sm:col-span-2 sm:mt-0">
      <input
        type="text"
        :name="field.label"
        :readonly="field.isReadOnly"
        placeholder="JHN.1.1 or JHN.1.1-JHN.1.5"
        autocomplete="given-name"
        :value="reference"
        @blur="update"
        class="input-field"
        :class="{ 'border-error': hasError, 'opacity-50': field.isReadOnly }"
      />
      <p class="text-sm text-error" v-if="hasError">
        This field cannot be empty
      </p>
      <textarea
        :readonly="field.isReadOnly"
        ref="textArea"
        placeholder="Verse"
        :value="verse"
        @input="updateVerse"
        class="input-field mt-2 h-64"
        :class="{ 'border-error': hasError, 'opacity-50': field.isReadOnly }"
      ></textarea>
      <p class="text-sm text-error" v-if="hasError">
        This field cannot be empty
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import { FieldSpec, Scripture } from "../interfaces";
import { useLanguageStore, useModelStore } from "../store";
import { commonProps } from "../Shared/helpers";

const props = defineProps({
  ...commonProps,
});

const field = computed(() => props.field as FieldSpec);
const fieldPath = computed(() => {
  if (props.rootPath === undefined) return field.value.name;
  return `${props.rootPath}.${field.value.name}`;
});

const model = useModelStore();
const startValue = model.getField(fieldPath.value, "") as Scripture;
const reference = ref(startValue.reference);
const verse = ref(startValue.verse);

const update = (event: Event) => {
  model.setScripture(fieldPath.value, (event.target as HTMLInputElement).value);
};

const updateVerse = (event: Event) => {
  model.updateVerse(fieldPath.value, (event.target as HTMLInputElement).value);
};

model.$subscribe(() => {
  nextTick().then(() => {
    const fresh = model.getField(fieldPath.value, "") as Scripture;
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
