import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private logInButton: Locator;
    private email: Locator;
    private password: Locator;

    constructor(page: Page) {
        this.page = page
        this.logInButton = this.page.getByRole('button', { name: 'Login' });
        this.email = this.page.getByPlaceholder('Your email');
        this.password = this.page.getByPlaceholder('Your password');
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async login(email: string, password: string): Promise<void> {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.logInButton.click()
    }


}

