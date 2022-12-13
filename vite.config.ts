import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const toPath = (filePath) => path.join(process.cwd(), filePath);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
