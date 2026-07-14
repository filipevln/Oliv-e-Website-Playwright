import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'website',
      testMatch: '**/website/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://website--prj-dev-infra-01.us-central1.hosted.app',
      },
    },
  ],
})
