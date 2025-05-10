 import { expect, test as setup } from '@playwright/test';
 import { LoginPage } from '../../../pages/login.page';
 import path from 'path';
 const authFile = path.join(__dirname, '../../.auth/user.json');

 setup('1: Setup login', async ({ page }) => {
     const loginPage = new LoginPage(page);
     await loginPage.navigate();
     await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
 
     await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
     await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
     await expect(page.getByText('Jane Doe')).toBeVisible();
 

     await page.context().storageState({ path: authFile });
 });


