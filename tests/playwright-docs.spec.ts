import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../POM/PlaywrightHomePage';
import { PlaywrightDocsPage } from '../POM/PlaywrightDocsPage';
import { PlaywrightReleaseNotesPage } from '../POM/PlaywrightReleaseNotesPage';

test.describe('Playwright Documentation Site', () => {

  test('H1 Assertion Test', async ({ page }) => {
    const home = new PlaywrightHomePage(page);
    await home.goto();
    await expect(home.mainHeading).toHaveText(
      'Playwright enables reliable end-to-end testing for modern web apps.'
    );
  });

  test('Search Navigation to Locators Docs', async ({ page }) => {
  const home = new PlaywrightHomePage(page);
  const docs = new PlaywrightDocsPage(page);

  await home.goto();
  await home.openSearch();

  await docs.searchAndNavigateToLocators();

  await expect(page).toHaveURL("https://playwright.dev/docs/locators");
});

  test('Footer Regex Assertion using aria snapshot', async ({ page }) => {
    const home = new PlaywrightHomePage(page);
    await home.goto();

    await expect(home.footer).toMatchAriaSnapshot(`
      - text: /Copyright © \\d{4} Microsoft/
    `);
  });

  test('Visual Snapshot of Homepage Hero', async ({ page }) => {
    const home = new PlaywrightHomePage(page);
    await home.goto();

    await expect(page.locator('main')).toHaveScreenshot('homepage-hero.png');
  });

  test('Collapse Get Started Menu on Release Notes', async ({ page }) => {
    const releaseNotes = new PlaywrightReleaseNotesPage(page);
    await releaseNotes.goto();

    await releaseNotes.toggleMenu();
    await expect(releaseNotes.getStartedMenu).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

});
