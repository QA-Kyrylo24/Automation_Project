import { expect, Locator } from '@playwright/test';
import { test } from '../../fixtures/fixture';


test('1UPD: Verify login', async ({ loginPage, appObjects }) => {

    await expect(loginPage).toHaveURL('https://practicesoftwaretesting.com/account');
    await expect(loginPage.getByTestId('page-title')).toHaveText('My account');
    await expect(appObjects.productPage.header.accountDropDown).toHaveText('Jane Doe');

});


test('2UPD: Verify product details', async ({ productCombinationPliersPage }) => {

    await productCombinationPliersPage.verifyPageDetails();
    await expect(productCombinationPliersPage.productName).toHaveText('Combination Pliers');
    await expect(productCombinationPliersPage.price).toHaveText('14.15');

});

test('3UPD: Verify add product to cart', async ({ page, productSlipJointPliersPage }) => {
    const itemText = page.getByText('Slip Joint Pliers', { exact: true });
    const quantityInput = page.getByLabel('Quantity for Slip Joint Pliers');


    await productSlipJointPliersPage.verifyPageDetails();
    await expect(productSlipJointPliersPage.productName).toHaveText('Slip Joint Pliers');
    await expect(productSlipJointPliersPage.price).toHaveText('9.17');
    await productSlipJointPliersPage.addToCart();

    await productSlipJointPliersPage.verifyAlert();
    await productSlipJointPliersPage.verifyProductQuantity('1');

    await productSlipJointPliersPage.navigateToCart();

    await productSlipJointPliersPage.verifyPageDetails();

    await expect(itemText).toBeVisible();
    await expect(quantityInput).toHaveValue('1');
});


test('4NEW: Verify login, order, payment', async ({ page, app }) => {

const productHomePage: Locator = page.locator('[data-test="product-name"]').nth(0);
const priceHomePage: Locator = page.locator('[data-test="product-price"]').nth(0);
const cartProductName: Locator = page.getByTestId('product-title');
const cartProductPrice: Locator = page.getByTestId('product-price');
const cartTotalPrice: Locator = page.getByTestId('cart-total');

await expect(productHomePage).toHaveText(/.+/);
await expect(priceHomePage).toHaveText(/.+/);
const productName: string = await productHomePage.innerText();
const productPrice: string = await priceHomePage.innerText();

await app.homePage.openProduct(productName);
await app.productPage.addToCart();
await app.productPage.navigateToCart();
await expect(cartProductName).toHaveText(productName);
await expect(cartProductPrice).toHaveText(productPrice);
await expect(cartTotalPrice).toHaveText(productPrice);

await app.checkoutPage.checkout();
await expect(app.checkoutPage.helloMessage).toBeVisible();
await app.checkoutPage.purchaseWithDefaultUser();
await expect(app.checkoutPage.confirmMessage).toBeVisible();

});




