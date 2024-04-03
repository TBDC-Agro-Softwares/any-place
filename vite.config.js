import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue(), dts({ insertTypesEntry: true, copyDtsFiles: true })],
  build: {
    sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'GoogleMaps',
      fileName: 'google-maps'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        sourcemap: false,
        exports: 'named',
        globals: { vue: 'Vue' }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
