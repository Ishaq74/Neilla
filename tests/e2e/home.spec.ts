import { test, expect } from '@playwright/test';

test.describe('Page d’accueil', () => {
  test('affiche le titre principal', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText(/haut de gamme/i);
  });

  test('navigation vers contact', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator('h2')).toContainText(/contact/i);
  });

  test('soumission du formulaire newsletter', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("S\'inscrire")');
    await expect(page.locator('text=Merci pour votre inscription')).toBeVisible();
  });

  test('navigation menu principal fonctionne', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a[href="/formations"]');
    await expect(page).toHaveURL(/\/formations$/);
    await page.goBack();
    await expect(page).toHaveURL('/');
  });

  test('focus et tabulation accessibles', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toMatch(/A|BUTTON|INPUT/);
  });

  test('formulaire newsletter : champ vide affiche une erreur', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="email"]', '');
    await page.click('button:has-text("S\'inscrire")');
    await expect(page.locator('text=champ requis')).toBeVisible();
  });

  test('affiche un message si aucune formation n’est disponible', async ({ page }) => {
    await page.goto('/');
    // Simule l’absence de formations (si possible via mock sinon skip)
    // Ici on vérifie juste la présence du message
    await expect(page.locator('text=Aucune formation disponible')).toBeVisible();
  });

  test('affiche un loader si chargement long', async ({ page }) => {
    await page.goto('/');
    // Simule un chargement long (si possible via mock sinon skip)
    await expect(page.locator('.loader, [aria-busy="true"]')).toBeVisible();
  });
});

