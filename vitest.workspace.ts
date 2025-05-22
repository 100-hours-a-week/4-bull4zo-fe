import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineWorkspace } from 'vitest/config'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
  {
    extends: 'vite.config.ts',
    test: {
      name: 'app',
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    },
  },
  {
    extends: 'vite.config.ts',
    plugins: [
      storybookTest({
        configDir: path.join(dirname, '.storybook'),
      }),
    ],
    test: {
      name: 'storybook',
      globals: true,
      environment: 'jsdom',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
])
