/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTest.ts'],
    coverage: {
      provider: 'c8',
      all: true,
    },
  },
  ssr: { noExternal: ['@reduxjs/toolkit'] },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'public'),
    },
  },
});
