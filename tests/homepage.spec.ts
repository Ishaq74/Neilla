import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and shows header', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
  });

  test('shows hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
  });

  test('shows footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigates to contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/contact/);
    await expect(page.locator('[data-testid="contact-section"]')).toBeVisible();
  });
});

// Ajoutez d'autres tests pour les pages et composants clés
