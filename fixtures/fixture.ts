import { test as base , expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';

type Fixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    checkoutPage: CheckoutPage;
    productCombinationPliersPage: ProductPage;
    productSlipJointPliersPage: ProductPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
        await expect(page).toHaveURL(/\/account$/);
        await use(loginPage);
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

    productCombinationPliersPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.openProduct('Combination Pliers');
        await use(productPage);
    },

    productSlipJointPliersPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.openProduct('Slip Joint Pliers');
        await use(productPage);
    },
});