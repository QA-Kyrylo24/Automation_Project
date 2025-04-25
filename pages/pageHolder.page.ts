import { Page } from '@playwright/test';

export abstract class PageHolder {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

}
