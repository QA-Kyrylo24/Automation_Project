import { Locator, Page } from '@playwright/test';

export class HomePage {
    combinationPliers: Locator;
    slipJointPliers: Locator;
    private page: Page;
    constructor(page: Page) {
        this.page = page;
        this.combinationPliers = this.page.getByText('Combination Pliers', { exact: true });
        this.slipJointPliers = page.getByRole('link', { name: 'Slip Joint Pliers' })
    }

    async navigate(url: string): Promise<void> {
        this.page.goto(url);
    }

    async openProduct(product: Locator): Promise<void> {
        product.click();
    }
}
