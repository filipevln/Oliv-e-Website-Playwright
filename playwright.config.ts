import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e/website',
  fullyParallel: true,
  retries: 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'on'
  },
  projects: [
    {
      name: 'website',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://olivesaude.com.br'
      }
    }
  ]
})
