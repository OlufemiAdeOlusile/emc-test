import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 0,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'reports/html',
      },
    ],
  ],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 10000,
    baseURL: process.env.BASE_URL,
    launchOptions: {
      headless: true,
      slowMo: 0,
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: {
      mode: 'retain-on-failure',
    },
    viewport: { width: 1920, height: 1080 },
  },
});
