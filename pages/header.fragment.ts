import { Locator, Page } from '@playwright/test';

export class HeaderF {
    cartIcon:Locator;
    private page: Page;
    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.getByLabel('cart');
    }

}
