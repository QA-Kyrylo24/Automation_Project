import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { mockObject } from '../../testData/mockObject'
import { ProductResponse } from '../../typings/productsResponse';

test('20 products mock', async ({ page }) => {
    const homePage = new HomePage(page);
    let respLength: number;
    await page.route('https://api.practicesoftwaretesting.com/products?between=price,1,100&page=1', async route => {
        const response = await route.fetch();
        const json = await response.json() as ProductResponse;
        respLength = json.data.length;
        for (let i = respLength; i < 20; i++) {
            const randomPrice = Math.random() * 10;
            json.data.push({
                "id": `mock-${i+1}`,
                "name": `Product ${i+1}`,
                "description": `Mock product ${i+1}`,
                "price": randomPrice,
                ... mockObject,
               
            });
        }


        await route.fulfill({ response, json });
    });

    await homePage.navigate();
    expect((await homePage.getProductNames()).length).toEqual(20);



});
