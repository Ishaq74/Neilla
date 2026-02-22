import { test, expect } from '@playwright/test';

test.describe('ProfilePage E2E', () => {
  test('affiche la page profil', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('h1')).toBeVisible();
  });
});
