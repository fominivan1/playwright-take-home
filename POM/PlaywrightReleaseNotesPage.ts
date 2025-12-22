import { Page, Locator } from '@playwright/test';

export class PlaywrightReleaseNotesPage {
  readonly page: Page;
  readonly getStartedMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedMenu = page.getByRole('button', { name: 'Getting Started' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev/docs/release-notes');
  }

  async toggleMenu() {
    await this.getStartedMenu.click();
  }
}
