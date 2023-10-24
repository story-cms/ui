import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { Story } from '../Shared/interfaces';
import { story as _story, stories as _stories } from '../helpers/mocks';

export const useConfigStore = defineStore('config', () => {
  const stories: Ref<string[]> = ref(_stories);
  const story: Ref<Story> = ref(_story);

  const setStory = (fresh: Story) => {
    story.value = fresh;
  };
  const setStories = (fresh: string[]) => {
    stories.value = fresh;
  };

  return {
    stories,
    story,
    setStory,
    setStories,
  };
});
