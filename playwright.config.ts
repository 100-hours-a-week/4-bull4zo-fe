// playwright.config.ts (프로젝트 루트)
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './test/e2e',
  timeout: 30_000,

  use: {
    baseURL: 'http://localhost:5173',
    launchOptions: { headless: true },
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'pnpm run dev',
    port: 5173,
    reuseExistingServer: false,
  },
})
