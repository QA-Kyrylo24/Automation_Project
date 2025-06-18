import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';
import { App } from '../typings/appClass';

type Fixtures = {
    loginPage: Page;
    homePage: HomePage;
    productPage: ProductPage;
    checkoutPage: CheckoutPage;
    productCombinationPliersPage: ProductPage;
    productSlipJointPliersPage: ProductPage;
    app: App;
    appObjects: App;
    loginPageWithStorageState: Page;
};



export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
        await expect(page).toHaveURL(/\/account$/);
        await use(page);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await use(homePage);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    // Custom fixture just for Task purpose
    productCombinationPliersPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.openProduct('Combination Pliers');
        await use(productPage);
    },
    
   // Custom fixture just for Task purpose
    productSlipJointPliersPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.openProduct('Slip Joint Pliers');
        await use(productPage);
    },

    app: async ({  loginPage, homePage}, use) => {
        const app = new App(loginPage);
        await use(app);
    },

    appObjects: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },
    
    loginPageWithStorageState: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'tests/.auth/user.json' });
        const page = await context.newPage();
        await use(page);
    },
});