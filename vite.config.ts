import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],

  resolve: {
    // alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    alias: {
      // vue: path.resolve('./node_modules/vue', 'dist', 'vue.runtime.esm-bundler.js'),
      vue: path.resolve('./node_modules/vue'),
    },
    dedupe: ['vue'],
  },
  build: {
    lib: {
      entry: {
        main: path.resolve(__dirname, 'src/index.ts'),
        styles: path.resolve(__dirname, 'src/style.css'),
      },
      name: 'Core',
      fileName: 'core',
    },
    rollupOptions: {
      external: [
        'vue',
        'pinia',
        'axios',
        'easymde',
        'luxon',
        '@aws-sdk/client-s3',
        '@aws-sdk/lib-storage',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
