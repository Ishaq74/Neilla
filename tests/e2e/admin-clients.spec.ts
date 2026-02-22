import { test, expect } from '@playwright/test';

test.describe('Gestion des clients admin', () => {
  test('affiche la table des clients', async ({ page }) => {
    await page.goto('/admin/clients');
    await expect(page.locator('text=Total clients')).toBeVisible();
    await expect(page.locator('text=Nouveau client')).toBeVisible();
  });

  test('ajout d’un nouveau client', async ({ page }) => {
    await page.goto('/admin/clients');
    await page.click('button:has-text("Nouveau client")');
    await page.fill('input[name="nom"]', 'Test Client');
    await page.fill('input[name="email"]', 'test@client.com');
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('text=Client ajouté')).toBeVisible();
  });

  test('affiche une erreur si email invalide', async ({ page }) => {
    await page.goto('/admin/clients');
    await page.click('button:has-text("Nouveau client")');
    await page.fill('input[name="email"]', 'not-an-email');
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('text=Email invalide')).toBeVisible();
  });

  test('suppression d’un client', async ({ page }) => {
    await page.goto('/admin/clients');
    await page.click('button:has-text("Supprimer")');
    await page.click('button:has-text("Confirmer")');
    await expect(page.locator('text=Client supprimé')).toBeVisible();
  });

  test('affiche un message si aucun client', async ({ page }) => {
    await page.goto('/admin/clients');
    await expect(page.locator('text=Aucun client trouvé')).toBeVisible();
  });

  test('accessibilité : tabulation sur la table', async ({ page }) => {
    await page.goto('/admin/clients');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toMatch(/BUTTON|A|INPUT/);
  });
});
