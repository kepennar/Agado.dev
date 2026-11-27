import { defineConfig, devices } from "@playwright/test";

const port = 4321;
// --ignore-lock keeps `astro preview` in the foreground: Astro 7 moves it to
// the background when it detects an AI agent, and Playwright then sees it exit
const preview = `pnpm preview --host 127.0.0.1 --port ${port} --ignore-lock`;
const webServerCommand =
  process.env.PLAYWRIGHT_SKIP_BUILD === "1"
    ? preview
    : `pnpm build && ${preview}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : "html",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    colorScheme: "light",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: webServerCommand,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
  },
});
