import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { dataSortOptions } from '../../testData/dataSortOptions';

dataSortOptions.forEach((sortBy) => {
    test(`Verify user can perform sorting by ${sortBy}`, async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.verifySorting(sortBy);
    });
})

