import { test, expect } from '@playwright/test';

test.describe('AdminClients E2E', () => {
  test('affiche la page clients', async ({ page }) => {
    await page.goto('/admin/clients');
    await expect(page.locator('h1')).toContainText('Gestion des Clients');
  });

  test('ouvre le modal nouveau client', async ({ page }) => {
    await page.goto('/admin/clients');
    await page.click('button:has-text("Nouveau client")');
    await expect(page.locator('form')).toBeVisible();
  });
});
