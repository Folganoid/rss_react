import { defineConfig } from 'cypress';
import codecov from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      codecov(on, config);
      return config;
    },
  },
});
