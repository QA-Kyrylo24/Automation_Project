import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
    cartIcon:Locator;
    private page: Page;
    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.getByLabel('cart');
    }

}
