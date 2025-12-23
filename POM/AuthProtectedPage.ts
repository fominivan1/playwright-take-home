import { Page } from '@playwright/test';

export class AuthProtectedPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:3000/protected');
  }
}
