import { test, expect } from '@playwright/test';

test.describe('Connexion admin', () => {
  test('affiche le formulaire de connexion', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('affiche/masque le mot de passe', async ({ page }) => {
    await page.goto('/admin/login');
    const toggleBtn = page.locator('button[aria-label*="Afficher le mot de passe"]');
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await toggleBtn.click();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('navigation vers création de compte', async ({ page }) => {
    await page.goto('/admin/login');
    await page.click('text=Créer un compte administrateur');
    await expect(page).toHaveURL(/\/admin\/register$/);
    await expect(page.locator('h2')).toContainText(/inscription/i);
  });

  test('affiche une erreur si champs vides', async ({ page }) => {
    await page.goto('/admin/login');
    await page.click('button:has-text("Se connecter")');
    await expect(page.locator('text=Email ou mot de passe incorrect')).toBeVisible();
  });
});
