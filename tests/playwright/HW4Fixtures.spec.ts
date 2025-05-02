import { expect, Locator } from '@playwright/test';
import { test } from '../../fixtures/fixture';
import { ProductPage } from '../../pages/product.page';

test('1UPD: Verify login', async ({ page, loginPage }) => {

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
    await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
    await expect(page.getByText('Jane Doe')).toBeVisible();

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


test('4NEW: Verify login, order, payment', async ({ page, loginPage, homePage, productPage, checkoutPage }) => {

const productHomePage: Locator = page.locator('[data-test="product-name"]').nth(0);
const priceHomePage: Locator = page.locator('[data-test="product-price"]').nth(0);
const cartProductName: Locator = page.getByTestId('product-title');
const cartProductPrice: Locator = page.getByTestId('product-price');
const cartTotalPrice: Locator = page.getByTestId('cart-total');

await expect(productHomePage).toHaveText(/.+/);
await expect(priceHomePage).toHaveText(/.+/);
const productName: string = await productHomePage.textContent();
const productPrice: string = await priceHomePage.textContent();

await homePage.openProduct(productName);
await productPage.addToCart();
await productPage.navigateToCart();
await expect(cartProductName).toHaveText(productName);
await expect(cartProductPrice).toHaveText(productPrice);
await expect(cartTotalPrice).toHaveText(productPrice);

await checkoutPage.checkout();
await expect(checkoutPage.helloMessage).toBeVisible();
await checkoutPage.checkout();
await checkoutPage.state.fill('State');
await checkoutPage.postcode.fill('12345');
await checkoutPage.checkout();
await checkoutPage.paymentMethod.selectOption('Credit Card');
await checkoutPage.cardNumber.fill('1111-2222-3333-4444');
await checkoutPage.expirationDate.fill('12/2030');
await checkoutPage.cvv.fill('123');
await checkoutPage.cardHolderName.fill('John Doe');
await checkoutPage.confirmButton.click();
await expect(checkoutPage.confirmMessage).toBeVisible();

});




