import { test, expect } from '@playwright/test';
import { AuthLoginPage } from '../POM/AuthLoginPage';
import { AuthProtectedPage } from '../POM/AuthProtectedPage';

test.describe('Authentication Flow', () => {

  test('Login through UI and save storage state', async ({ page }) => {
    const login = new AuthLoginPage(page);

    await login.goto();
    await login.login('testuser', 'testpass');

    await expect(page.locator('text=Welcome, testuser')).toBeVisible();

    await page.context().storageState({ path: 'auth.json' });
  });

  test('Login with invalid credentials', async ({ page }) => {
    const login = new AuthLoginPage(page);

    await login.goto();
    await login.login('wrong', 'credentials');

    await expect(page.locator('text=Invalid')).toBeVisible();
  });

  test('Access protected route using auth token', async ({ browser }) => {
    const context = await browser.newContext({ storageState: 'auth.json' });
    const page = await context.newPage();

    const protectedPage = new AuthProtectedPage(page);
    await protectedPage.goto();

    await expect(page.locator('text=Protected')).toBeVisible();
  });

});
