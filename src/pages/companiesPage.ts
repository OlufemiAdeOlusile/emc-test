import { type Locator, type Page } from '@playwright/test';
import { CompanyDetails, titleToPropertyMap } from '../types/companyDetailsTypes';
import { BasePage } from './BasePage';
import { downloadAndWriteImageFile } from '../utils/imageUtility';
import * as path from 'path';
import findRoot from 'find-root';

export class CompaniesPage extends BasePage {
  readonly mainContentTitle: Locator;
  readonly resultsLocators: Locator;
  readonly contactItemsLocator: Locator;
  readonly COMPANY_CONTACTS_ITEMS_TITLE: string = '.company-contacts-item-title';
  readonly COMPANY_DETAILS_IMAGE_SELECTOR: string = '.company-details-img-wrap img';
  constructor(page: Page) {
    super(page);
    this.mainContentTitle = page.locator('.main-content-title');
    this.resultsLocators = page.locator('.browse-results .emc-link');
    this.contactItemsLocator = page.locator('.company-details-contact-items .company-contacts-item');
  }

  async waitForPage() {
    await this.mainContentTitle.waitFor({ state: 'visible' });
  }

  async getAllContactInformationAndSaveLogo(baseUrl: string): Promise<CompanyDetails> {
    await this.contactItemsLocator.first().waitFor({ state: 'visible' });
    const itemCount: number = await this.contactItemsLocator.count();
    const companyName: string = await this.mainContentTitle.textContent();

    const companyDetails: CompanyDetails = {
      Name: companyName,
      Logo: await this.getImageLocation(baseUrl, companyName.split(' ').join('_')),
    };

    for (let i: number = 0; i < itemCount; i++) {
      const titleLocator: Locator = this.contactItemsLocator.nth(i).locator(this.COMPANY_CONTACTS_ITEMS_TITLE);
      const titleText: string | null = await titleLocator.textContent();

      if (titleText) {
        const normalizedTitle: string = titleText.trim().toLowerCase();
        const propertyKey: keyof CompanyDetails= titleToPropertyMap[normalizedTitle];

        if (propertyKey) {
          const existingValue: string = companyDetails[propertyKey] ?? null;
          companyDetails[propertyKey] = await this.validateAndGetValueText( i, existingValue);
        } else {
          console.log(`Unknown title: ${titleText}`);
        }
      }
    }

    return companyDetails;
  }

  private async getImageLocation(baseUrl: string, imageName: string): Promise<string> {
    const imageUrl: string = await this.page.getAttribute(this.COMPANY_DETAILS_IMAGE_SELECTOR, 'src');
    const fullImageUrl: string = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
    const projectRoot = findRoot(__dirname);
    const filePath: string = path.join(projectRoot, 'image', `${imageName}.png`);
    await downloadAndWriteImageFile(this.page, fullImageUrl, filePath);
    return `${imageName}.png`;
  }
  private async validateAndGetValueText(location: number, companyValue: string | null): Promise<string | null> {
    let value: string | null = null;

    if (await this.contactItemsLocator.nth(location).locator('span').count() > 0) {
      const textContent: string | null = await this.contactItemsLocator.nth(location).locator('span').textContent();
      value = textContent?.trim() ?? null;
    } else if (await this.contactItemsLocator.nth(location).locator('a').count() > 0) {
      const emailLocator = this.contactItemsLocator.nth(location).locator('a');
      const emailText: string | null = await emailLocator.getAttribute('href');
      value = emailText ? emailText.replace('mailto:', '').trim() : null;
    }
    if (companyValue && value) {
      return `${companyValue}, ${value}`;
    } else if (companyValue) {
      return companyValue;
    }

    return value;
  }

}


