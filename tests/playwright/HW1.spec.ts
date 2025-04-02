import { expect, test } from '@playwright/test';

test('Test 1: Verify login with valid credentials', async ({ page }) => {
    const credentials = {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
    }
    const logInButton = page.getByRole('button', { name: 'Login' });
    const email = page.getByPlaceholder('Your email');
    const password = page.getByPlaceholder('Your password');

    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await email.fill(credentials.email);
    await password.fill(credentials.password);
    await logInButton.click()

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
    await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
    await expect(page.getByText('Jane Doe')).toBeVisible();

});
