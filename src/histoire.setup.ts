import "./style.css"; // Import global CSS

import { defineSetupVue3 } from "@histoire/plugin-vue";
import { pinia } from "./store";

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
  app.use(pinia);
});
