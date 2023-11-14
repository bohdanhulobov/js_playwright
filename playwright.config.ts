// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();
/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.URL,

    /* Capturing snapshot of the page if test fails. */
    screenshot: "only-on-failure",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "auth setup",
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "chromium",
      dependencies: ["auth setup"],
      snapshotDir: "tests/snapshots/chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
    },

    {
      name: "webkit",
      dependencies: ["auth setup"],
      snapshotDir: "tests/snapshots/webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json",
      },
    },

    // {
    //   name: "firefox",
    //   dependencies: ["auth setup"],
    //   snapshotDir: "tests/snapshots/firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     storageState: "playwright/.auth/user.json",
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
