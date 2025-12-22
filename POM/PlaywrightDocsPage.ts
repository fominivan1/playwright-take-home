import { Page, Locator } from '@playwright/test';

export class PlaywrightDocsPage {
  readonly page: Page;
  readonly searchDocs: Locator;
  readonly locatorsResult: Locator;
  readonly locatorH1: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchDocs = page.locator('input[placeholder="Search docs"]')
    this.locatorsResult = page.getByRole('option', { name: 'Locators' });
    this.locatorH1 = page.locator('h1', { hasText: 'Locators' });
  }

  async searchAndNavigateToLocators() {
    await this.searchDocs.fill('locators');
    await this.locatorsResult.first().click();
    await this.locatorH1.waitFor({ state: 'visible' });
  }
}
