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

test('Test 2: Verify user can view product details', async ({ page }) => {
    const combinationPliers = page.getByText('Combination Pliers', { exact: true });
    const productName = page.getByRole('heading', { name: 'Combination Pliers' })
    const price = page.locator('[aria-label="unit-price"]');
    const buttonCart = page.getByRole('button', { name: 'Add to cart' });
    const buttonFavourites = page.getByRole('button', { name: 'Add to favourites' });

    await page.goto('https://practicesoftwaretesting.com');
    await combinationPliers.click();
    await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/product/)
    await expect(productName).toHaveText('Combination Pliers');
    await expect(price).toHaveText('14.15');
    await expect(buttonCart).toBeVisible();
    await expect(buttonFavourites).toBeVisible();
});

test('Test 3: Verify user can add product to cart', async ({ page }) => {
    const slipJointPliers = page.getByRole('link', { name: 'Slip Joint Pliers' })
    const productName = page.getByRole('heading', { name: 'Slip Joint Pliers' })
    const price = page.locator('[aria-label="unit-price"]');
    const buttonCart = page.getByRole('button', { name: 'Add to cart' });
    const alert = page.getByRole('alert');
    const quantity = page.locator('#quantity-input')
    const cartIcon = page.getByLabel('cart');
    const proceedToCheckout = page.getByRole('button', { name: 'Proceed to checkout' });
    const itemText = page.getByText('Slip Joint Pliers', { exact: true });
    const quantityInput = page.getByLabel('Quantity for Slip Joint Pliers');

    await page.goto('https://practicesoftwaretesting.com');
    await slipJointPliers.click();

    await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/product/)
    await expect(productName).toHaveText('Slip Joint Pliers');
    await expect(price).toHaveText('9.17');
    await buttonCart.click();

    await expect(alert).toBeVisible();
    const alertStart = Date.now();
    await expect(alert).toContainText('Product added to shopping cart');
    await expect(alert).toBeHidden({ timeout: 9000 });
    const alertHide = Date.now();
    expect(alertHide - alertStart).toBeGreaterThanOrEqual(5000);
    expect(alertHide - alertStart).toBeLessThanOrEqual(9000);
    await expect(quantity).toHaveValue('1');

    await cartIcon.click();
    await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting\.com\/checkout/)
    await expect(proceedToCheckout).toBeVisible;
    await expect(itemText).toBeVisible;
    await expect(quantityInput).toHaveValue('1');
});
