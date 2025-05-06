import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';
import { Page } from '@playwright/test';

export class App {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    checkoutPage: CheckoutPage;
    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }

};