import { test, expect } from '@playwright/test';

test.describe('Dashboard admin', () => {
  test('affiche les statistiques principales', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page.locator('text=Statistiques')).toBeVisible();
    await expect(page.locator('text=Clients')).toBeVisible();
    await expect(page.locator('text=Chiffre d’affaires')).toBeVisible();
  });

  test('navigation vers la gestion des clients', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await page.click('a[href="/admin/clients"]');
    await expect(page).toHaveURL(/\/admin\/clients$/);
    await expect(page.locator('text=Total clients')).toBeVisible();
  });

  test('affiche un message si aucune statistique', async ({ page }) => {
    await page.goto('/admin/dashboard');
    // Simule l’absence de stats (mock ou skip)
    await expect(page.locator('text=Aucune statistique disponible')).toBeVisible();
  });

  test('accessibilité : tabulation sur les widgets', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.className);
    expect(focused).toMatch(/widget|card|stat/);
  });

  test('affiche un loader si chargement long', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page.locator('.loader, [aria-busy="true"]')).toBeVisible();
  });

  test('affiche une erreur si accès non autorisé', async ({ page }) => {
    // Simule un accès non autorisé (mock ou skip)
    await page.goto('/admin/dashboard');
    await expect(page.locator('text=Accès refusé')).toBeVisible();
  });
});
