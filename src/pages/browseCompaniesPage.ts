import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BrowseCompaniesPage extends BasePage{
  readonly menuLocators: Locator;
  readonly resultsLocators: Locator;

  constructor(page: Page) {
    super(page);
    this.menuLocators = page.locator('.browse-menu .emc-link');
    this.resultsLocators = page.locator('.browse-results .emc-link');
  }

  async waitForPage() {
    await this.menuLocators.first().waitFor({state: 'visible'});
  }

  async getMenuLocators():Promise<Locator>{
    return this.menuLocators
  }

  async getResultsLocators():Promise<Locator>{
    return this.resultsLocators
  }

}