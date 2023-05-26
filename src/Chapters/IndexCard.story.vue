<template>
  <Story id="index-card" title="Index Card" group="chapterwidgets">
    <Variant title="Without Image">
      <IndexCard
        :item="itemNoImage"
        :is-list="notList"
        scope="Live"
        chapter-name="Story"
      />
    </Variant>
    <Variant title="With Image">
      <IndexCard :item="item" :is-list="notList" scope="Live" chapter-name="Story" />
    </Variant>
    <Variant title="Placeholder Image">
      <IndexCard
        :item="itemNoImage"
        :is-list="notList"
        scope="Live"
        placeholder-image="https://res.cloudinary.com/onesheep/image/upload/v1685084993/christ-chaos-header_yqrufy.jpg"
        chapter-name="Story"
      />
    </Variant>
    <Variant title="Scope">
      <IndexCard
        :item="item"
        :is-list="notList"
        scope="Draft"
        placeholder-image="https://res.cloudinary.com/onesheep/image/upload/v1684754051/Screenshot_2023-05-22_at_13.12.03_pnamdt.png"
        chapter-name="Story"
      />
      <template #controls> </template>
    </Variant>
    <Variant title="List">
      <IndexCard
        :item="item"
        :is-list="isList"
        scope=""
        placeholder-image="https://res.cloudinary.com/onesheep/image/upload/v1684754051/Screenshot_2023-05-22_at_13.12.03_pnamdt.png"
        chapter-name="Story"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import IndexCard from './IndexCard.vue';

const isList = true;
const notList = false;
const item = {
  number: 1,
  imageUrl:
    'https://res.cloudinary.com/onesheep/image/upload/v1684754051/Screenshot_2023-05-22_at_13.12.03_pnamdt.png',
  title: 'Index Ready Item Title',
  tags: ['Live'],
};
const itemNoImage = {
  number: 1,
  imageUrl: '',
  title: 'Index Ready Item Title',
  tags: ['Live'],
};
</script>
