import { Locator, Page, expect } from '@playwright/test';
import { HeaderF } from './header.fragment';
export class ProductPage {
    private page: Page;
    buttonCart: Locator;
    buttonFavourites: Locator;
    productName: Locator;
    price: Locator;
    alert: Locator;
    quantity: Locator;
    header: HeaderF;
    constructor(page: Page) {
        this.page = page;
        this.buttonCart = page.getByRole('button', { name: 'Add to cart' });
        this.buttonFavourites = page.getByRole('button', { name: 'Add to favourites' });
        this.productName = page.locator('[data-test="product-name"]');
        this.price = page.locator('[aria-label="unit-price"]');
        this.alert = page.getByRole('alert');
        this.quantity = page.locator('#quantity-input')
        this.header = new HeaderF(page);
    };

    async verifyPageDetails(): Promise<void> {
        await expect(this.page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/product/)
        await expect(this.buttonCart).toBeVisible();
        await expect(this.buttonFavourites).toBeVisible();  
    };

    async verifyAlert(): Promise<void> {
        await expect(this.alert).toBeVisible();
        const alertStart = Date.now();
        await expect(this.alert).toContainText('Product added to shopping cart');
        await expect(this.alert).toBeHidden({ timeout: 9000 });
        const alertHide = Date.now();
        expect(alertHide - alertStart).toBeGreaterThanOrEqual(5000);
        expect(alertHide - alertStart).toBeLessThanOrEqual(9000);
    };

    async verifyProductQuantity(quantity: string): Promise<void> {
        await expect(this.quantity).toHaveValue(quantity);
    };

    async addToCart(): Promise<void> {
        await this.buttonCart.click();
    }

    async navigateToCart(): Promise<void> {
        await this.header.cartIcon.click();
    }
}