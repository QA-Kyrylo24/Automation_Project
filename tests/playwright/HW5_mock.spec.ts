import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('20 products mock', async ({ page }) => {
    const homePage = new HomePage(page);
    let respLength: number;
    await page.route('https://api.practicesoftwaretesting.com/products?between=price,1,100&page=1', async route => {
        const response = await route.fetch();
        const json = await response.json();
        respLength = json.data.length;
        for (let i = respLength; i < 20; i++) {
            const randomPrice = Math.random() * 10;
            json.data.push({
                "id": `mock-${i+1}`,
                "name": `Product ${i+1}`,
                "description": `Mock product ${i+1}`,
                "price": randomPrice,
                "is_location_offer": false,
                "is_rental": false,
                "in_stock": true,
                "product_image": {
                    "id": "01JTGSP3M2J3475271JXXN89YK",
                    "by_name": "ANIRUDH",
                    "by_url": "https:\/\/unsplash.com\/@lanirudhreddy",
                    "source_name": "Unsplash",
                    "source_url": "https:\/\/unsplash.com\/photos\/3esjG-nlgyk",
                    "file_name": "hammer04.avif",
                    "title": "Hammer"
                },
                "category": {
                    "id": "01JTGSP3KNK3K5EDBMECBV5F32",
                    "name": "Hammer",
                    "slug": "hammer",
                    "parent_id": "01JTGSP3K56FYC3326FA2DJZZK"
                },
                "brand": {
                    "id": "01JTGSP3JB4T9379NFJWA10MBM",
                    "name": "ForgeFlex Tools",
                    "slug": "forgeflex-tools"
                }
                
            });
        }


        await route.fulfill({ response, json });
    });

    await homePage.navigate();
    expect((await homePage.getProductNames()).length).toEqual(20);

});
