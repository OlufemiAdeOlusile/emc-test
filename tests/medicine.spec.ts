import { test } from 'src/fixtures';
import { BrowseCompaniesPage } from '../src/pages/browseCompaniesPage';
import { CompaniesPage } from '../src/pages/companiesPage';
import { Locator } from '@playwright/test';
import { AllCompanyDetails, CompanyDetails } from '../src/types/companyDetailsTypes';
import { writeToJsonFile } from '../src/utils/imageUtility';

const { BASE_URL } = process.env;

test.describe('Playwright', () => {
  // eslint-disable-next-line playwright/expect-expect
  test('Save all Company details', async ({ page }) => {
    const browseCompaniesPage: BrowseCompaniesPage = new BrowseCompaniesPage(page);
    const menuLocators: Locator = await browseCompaniesPage.getMenuLocators();
    const resultsLocators: Locator = await browseCompaniesPage.getResultsLocators();
    const companiesPage: CompaniesPage = new CompaniesPage(page);
    const allCompanyDetails: AllCompanyDetails = { companies: [] };

    const menuLength: number = await menuLocators.count();

    for (let menuIndex = 0; menuIndex < menuLength; menuIndex++) {
      await menuLocators.nth(menuIndex).click();
      await page.reload();
      await browseCompaniesPage.waitForPage();

      const resultsLength: number = await resultsLocators.count();

      for (let resultIndex = 0; resultIndex < resultsLength; resultIndex++) {
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (resultIndex === 0 || resultIndex === 2 || resultIndex === resultsLength - 1) {
          await resultsLocators.nth(resultIndex).click();
          const companyDetails: CompanyDetails = await companiesPage.getAllContactInformationAndSaveLogo(BASE_URL);
          await page.goBack();
          await browseCompaniesPage.waitForPage();
          allCompanyDetails.companies.push(companyDetails);
        }
      }
    }
    await writeToJsonFile<AllCompanyDetails>('companyDetails', allCompanyDetails)
  });
});
