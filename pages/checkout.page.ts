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

    async purchaseWithDefaultUser(): Promise<void> {
        await this.checkout();
        await this.state.fill('State');
        await this.postcode.fill('12345');
        await this.checkout();
        await this.paymentMethod.selectOption('Credit Card');
        await this.cardNumber.fill('1111-2222-3333-4444');
        await this.expirationDate.fill('12/2030');
        await this.cvv.fill('123');
        await this.cardHolderName.fill('John Doe');
        await this.confirmButton.click(); 
    }

}


