import { test, expect } from '@playwright/test';

test.describe('NotFound E2E', () => {
  test('affiche la page 404', async ({ page }) => {
    await page.goto('/random-url-inexistante');
    await expect(page.locator('h1')).toContainText('Page non trouvée');
  });
});
