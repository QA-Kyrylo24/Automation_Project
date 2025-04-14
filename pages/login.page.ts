import { Locator } from '@playwright/test';
import { PageHolder } from './pageHolder.page';

export class LoginPage extends PageHolder {

    private logInButton: Locator = this.page.getByRole('button', { name: 'Login' });
    private email: Locator = this.page.getByPlaceholder('Your email');
    private password = this.page.getByPlaceholder('Your password');

    async navigate(): Promise<void> {
        await this.page.goto(process.env.WEB_URL + '/auth/login');
    }

    async login(email: string, password: string): Promise<void> {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.logInButton.click()
    }


}

