import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import strip from "vite-plugin-strip-comments";

const NAME = 'ColorPicker';

const fileName = {
  es: `color-picker.mjs`,
  cjs: `color-picker.cjs`,
  iife: `color-picker.js`,
};

export default defineConfig({
  base: './',
  plugins: [
    dts({
      outDir: 'dist/js',
      copyDtsFiles: true,
      rollupTypes: true,
    }),
    strip()
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist/js',
    lib: {
      entry: resolve(__dirname, 'src/ts/index.ts'),
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format: string) => fileName[format],
    },
    sourcemap: true,
    target: "ESNext",
  },
});

