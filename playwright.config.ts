import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:6006/story',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command:
      'VITE_CLOUDINARY_API_KEY=$$VITE_CLOUDINARY_API_KEY VITE_CLOUDINARY_SECRET=$$VITE_CLOUDINARY_SECRET npm run dev',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
  },
});
console.log(process.env.VITE_CLOUDINARY_API_KEY);
