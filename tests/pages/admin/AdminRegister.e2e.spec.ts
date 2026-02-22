import { test, expect } from '@playwright/test';

test.describe('AdminRegister E2E', () => {
  test('affiche le formulaire d’inscription', async ({ page }) => {
    await page.goto('/admin/register');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });
});
