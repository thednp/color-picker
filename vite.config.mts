import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const NAME = 'ColorPicker';

const fileName = {
  es: `color-picker.mjs`,
  cjs: `color-picker.cjs`,
  iife: `color-picker.js`,
};

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist/js',
    lib: {
      entry: resolve(__dirname, 'src/ts/index.ts'),
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format: string) => fileName[format],
    },
    target: 'ESNext',
    sourcemap: true,
    minify: true,
  },
});

