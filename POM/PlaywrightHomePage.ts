import { Page, Locator } from '@playwright/test';

export class PlaywrightHomePage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly searchButton: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.locator('h1');
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.footer = page.locator('footer');
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async openSearch() {
    await this.searchButton.click();
  }
}
