import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { ProductPage } from '../../pages/product.page';
import { CheckoutPage } from '../../pages/checkout.page';
test('Test 1: Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
    await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
    await expect(page.getByText('Jane Doe')).toBeVisible();

});

test('Test 2: Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await homePage.navigate();
    await homePage.openProduct('Combination Pliers');

    await productPage.verifyPageDetails();
    await expect(productPage.productName).toHaveText('Combination Pliers');
    await expect(productPage.price).toHaveText('14.15');

});

test('Test 3: Verify user can add product to cart', async ({ page }) => {
    const itemText = page.getByText('Slip Joint Pliers', { exact: true });
    const quantityInput = page.getByLabel('Quantity for Slip Joint Pliers');
    
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkOutPage = new CheckoutPage(page);
    await homePage.navigate();
    await homePage.openProduct('Slip Joint Pliers');

    await productPage.verifyPageDetails();
    await expect(productPage.productName).toHaveText('Slip Joint Pliers');
    await expect(productPage.price).toHaveText('9.17');
    await productPage.addToCart();

    await productPage.verifyAlert();
    await productPage.verifyProductQuantity('1');

    await productPage.navigateToCart();

    await checkOutPage.verifyPageDetails();

    await expect(itemText).toBeVisible();
    await expect(quantityInput).toHaveValue('1');
});
