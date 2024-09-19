/// <reference types="vite/client" />
"use strict";
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { name } from './package.json';

const getPackageName = () => {
  return name.includes('@') ? name.split('/')[1] : name;
};

const NAME = 'ColorPicker';

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.js`,
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

