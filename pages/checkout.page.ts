import { Locator, expect } from '@playwright/test';
import { PageHolder } from './pageHolder.page';
export class CheckoutPage extends PageHolder {
    proceedToCheckout: Locator = this.page.getByRole('button', { name: 'Proceed to checkout' });
    state: Locator = this.page.getByPlaceholder(/State/);
    postcode: Locator = this.page.getByPlaceholder(/Postcode/);
    cardNumber: Locator = this.page.getByPlaceholder(/Credit Card Number/);
    expirationDate: Locator = this.page.getByPlaceholder(/Expiration Date/);
    cvv: Locator = this.page.getByPlaceholder(/CVV/);
    cardHolderName: Locator = this.page.getByPlaceholder(/Card Holder Name/);
    helloMessage: Locator = this.page.getByText(/Hello Jane Doe/);
    confirmMessage: Locator = this.page.getByText(/Payment was successful/);
    paymentMethod: Locator = this.page.locator('select');
    confirmButton: Locator = this.page.getByRole('button', { name: 'Confirm' })


    async verifyPageDetails(): Promise<void> {
        await expect(this.page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/checkout/)
        await expect(this.proceedToCheckout).toBeVisible();
    };

    async checkout(): Promise<void> {
        await this.proceedToCheckout.click()
    }

}


