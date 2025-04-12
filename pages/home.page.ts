import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigate(): Promise<void> {
        this.page.goto(process.env.WEB_URL!);
    }

    async openProduct(productName: string): Promise<void> {
        this.page.getByRole('link', { name: productName }).click();
    }
}
