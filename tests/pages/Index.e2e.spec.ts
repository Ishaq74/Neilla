import { test, expect } from '@playwright/test';

test.describe('Index E2E', () => {
  test('affiche la homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
