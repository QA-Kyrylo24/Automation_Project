import { Locator, Page, expect } from '@playwright/test';
export class CheckoutPage {
    private page: Page;
    proceedToCheckout: Locator;
    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckout = this.page.getByRole('button', { name: 'Proceed to checkout' });
    };

    async verifyPageDetails(): Promise<void> {
        await expect(this.page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/checkout/)
        await expect(this.proceedToCheckout).toBeVisible();
    };

}

