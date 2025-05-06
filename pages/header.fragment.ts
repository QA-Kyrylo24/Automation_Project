import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
    cartIcon:Locator;
    accountDropDown: Locator;
    private page: Page;
    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.getByTestId('nav-cart');
        this.accountDropDown = page.getByTestId('nav-menu');
    }

}
