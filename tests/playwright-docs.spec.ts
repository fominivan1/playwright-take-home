import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../POM/PlaywrightHomePage';
import { PlaywrightDocsPage } from '../POM/PlaywrightDocsPage';
import { PlaywrightReleaseNotesPage } from '../POM/PlaywrightReleaseNotesPage';

test.describe('Playwright Documentation Site', () => {

  test('PW-DOC-001: H1 Assertion Test', async ({ page }) => {
    const home = new PlaywrightHomePage(page);
    await home.goto();
    await expect(home.mainHeading).toHaveText(
      'Playwright enables reliable end-to-end testing for modern web apps.'
    );
  });

  test('PW-DOC-002: Search Navigation to Locators Docs', async ({ page }) => {
  const home = new PlaywrightHomePage(page);
  const docs = new PlaywrightDocsPage(page);

  await home.goto();
  await home.openSearch();

  await docs.searchAndNavigateToLocators();

  await expect(page).toHaveURL("https://playwright.dev/docs/locators");
});

  test('PW-DOC-003: Footer Regex Assertion using aria snapshot', async ({ page }) => {
    const home = new PlaywrightHomePage(page);
    await home.goto();

    await expect(home.footer).toMatchAriaSnapshot(`
      - text: /Copyright © \\d{4} Microsoft/
    `);
  });

  test('PW-DOC-004: Visual Snapshot of Homepage Hero', async ({ page }) => {
    const home = new PlaywrightHomePage(page);
    const getStarted = page.getByRole('link', { name: 'Get started' });
    await home.goto();

    await expect(page.locator('main')).toHaveScreenshot('homepage-hero.png');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Playwright/);
    await expect(page.getByText('Full isolation • Fast execution')).toBeVisible();

    await expect(getStarted).toBeVisible();
    await expect(getStarted).toHaveAttribute('href', /docs\/intro/);
  });

  test('PW-DOC-005: Collapse Get Started Menu on Release Notes', async ({ page }) => {
    const releaseNotes = new PlaywrightReleaseNotesPage(page);
    await releaseNotes.goto();

    await releaseNotes.toggleMenu();
    await expect(releaseNotes.getStartedMenu).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

});
