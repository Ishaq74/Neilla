import { test, expect } from '@playwright/test';

test.describe('ReservationPage E2E', () => {
  test('affiche la page réservation', async ({ page }) => {
    await page.goto('/reservation');
    await expect(page.locator('h1')).toBeVisible();
  });
});
