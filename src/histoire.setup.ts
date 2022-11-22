import "./style.css"; // Import global CSS

import store from "./store";
import { defineSetupVue3 } from "@histoire/plugin-vue";

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
  app.provide("store", store);
});
