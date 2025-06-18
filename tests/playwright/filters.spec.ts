import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from '../../typings/filterOptions';
import { dataSortOptions } from '../../testData/dataSortOptions';
import { dataCategories } from '../../testData/dataFilterOptions';

dataSortOptions.forEach((sortBy) => {
    test(`Verify user can perform sorting by ${sortBy}`, async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.verifySorting(sortBy);
    });
})



test(`Verify user can filter products by category "Sander"`, {
  tag: '@runCI',
}, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    const filteredApiProductNames: [string[], string[]] = await homePage.selectCategory(POWER_TOOLS.SANDER);
    const uiProductNames = await homePage.getProductNames();

    expect(uiProductNames).toEqual(filteredApiProductNames[0]);
    uiProductNames.forEach((name) => {
        expect(name.includes(POWER_TOOLS.SANDER)).toBe(true);
        });



});

dataCategories.forEach((checkboxes) => {
    test(`Verify user can filter products by category ${checkboxes.join(', ')}`, {
  tag: '@runCI',
}, async ({ page }) => {
        let filteredApiProductNames: [string[], string[]] = [[], []];
        const homePage = new HomePage(page);
        await homePage.navigate();
        for (const select of checkboxes) {
            filteredApiProductNames = await homePage.selectCategory(select);
        }

        const uiProductNames = await homePage.getProductNames();
        expect(uiProductNames).toEqual(filteredApiProductNames[0]);

        uiProductNames.forEach((product, index) => {
            const expectedCategory = filteredApiProductNames[1][index];
            const match = product.includes(expectedCategory);
            expect(match).toBe(true);
        });

    });
})
