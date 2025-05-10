import {  expect } from '@playwright/test';
import fs from 'fs';
import { test } from '../../fixtures/fixture';

// Uncomment storageState in config and UIsetup dependency
test('Verify login with storageState from config', async ({ page }) => {
    await page.goto('/account');   
    await expect(page.getByText('Jane Doe')).toBeVisible();

});

test.use({ storageState: 'tests/.auth/user.json' });
test('Verify login with test.use', async ({ page }) => {
    await page.goto('/account');   
    await expect(page.getByText('Jane Doe')).toBeVisible();

});


test('Verify login with fixture containing storageState', async ({ loginPageWithStorageState  }) => {
    await loginPageWithStorageState.goto('/account');   
    await expect(loginPageWithStorageState.getByText('Jane Doe')).toBeVisible();

});

// Uncomment APIsetup dependency
test('Verify API login', async ({ page }) => {
    const { token } = JSON.parse(fs.readFileSync('tests/.auth/token.json', 'utf-8'))  as { token: string };
    await page.goto('/account');  
    await page.evaluate((token) => {
      localStorage.setItem('auth-token', token);
    }, token);
    
    await page.reload();
    
    await expect(page.getByText('Jane Doe')).toBeVisible();

});
