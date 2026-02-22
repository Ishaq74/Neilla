import { test, expect } from '@playwright/test';

test.describe('Gestion des réservations admin', () => {
  test('affiche la table des réservations', async ({ page }) => {
    await page.goto('/admin/reservations');
    await expect(page.locator('text=Nouvelle réservation')).toBeVisible();
    await expect(page.locator('text=En attente')).toBeVisible();
  });

  test('création d’une nouvelle réservation', async ({ page }) => {
    await page.goto('/admin/reservations');
    await page.click('button:has-text("Nouvelle réservation")');
    await page.fill('input[name="client"]', 'Test Client');
    await page.fill('input[name="date"]', '2026-02-18');
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('text=Réservation ajoutée')).toBeVisible();
  });

  test('affiche une erreur si date invalide', async ({ page }) => {
    await page.goto('/admin/reservations');
    await page.click('button:has-text("Nouvelle réservation")');
    await page.fill('input[name="date"]', 'invalid-date');
    await page.click('button:has-text("Enregistrer")');
    await expect(page.locator('text=Date invalide')).toBeVisible();
  });

  test('suppression d’une réservation', async ({ page }) => {
    await page.goto('/admin/reservations');
    await page.click('button:has-text("Supprimer")');
    await page.click('button:has-text("Confirmer")');
    await expect(page.locator('text=Réservation supprimée')).toBeVisible();
  });

  test('affiche un message si aucune réservation', async ({ page }) => {
    await page.goto('/admin/reservations');
    await expect(page.locator('text=Aucune réservation trouvée')).toBeVisible();
  });

  test('accessibilité : tabulation sur la table', async ({ page }) => {
    await page.goto('/admin/reservations');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toMatch(/BUTTON|A|INPUT/);
  });
});
