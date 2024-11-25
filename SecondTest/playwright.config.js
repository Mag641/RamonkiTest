import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 0,
    use: {
        headless: false,
        browserName: 'chromium',
        baseURL: 'https://ramonki.by',
    },
    reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});