import { Locator, expect } from '@playwright/test';
import { SortOption } from '../typings/sortOptions';
import { apiResponse } from '../typings/apiResponse';
import { PageHolder } from './pageHolder.page';
import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from '../typings/filterOptions';
export class HomePage extends PageHolder{

    private readonly productName: Locator = this.page.getByTestId('product-name');
    private readonly price: Locator= this.page.getByTestId('product-price');
    private readonly filterSection: Locator = this.page.getByTestId('filters');
    private readonly sortDropDown: Locator = this.filterSection.getByTestId('sort');
    private readonly categories: Locator = this.filterSection.locator('.checkbox');


    async navigate(): Promise<void> {
        await this.page.goto(process.env.WEB_URL!);
    }

    async openProduct(productName: string): Promise<void> {
        await this.page.getByRole('link', { name: productName }).click();
    }

    async selectSortOption(option: SortOption): Promise<string[]> {
        const responsePromise = this.page.waitForResponse((response) =>
            response.url().includes('/products?sort=')
            && response.status() === 200
            && response.request().method() === 'GET',
        );
        await this.sortDropDown.selectOption(option)
        const response = await responsePromise;
        const { data } = await response.json() as { data: apiResponse[] };
        const apiSortedProducts = data.map((product) => product.name);
        return apiSortedProducts;
    }

    async selectCategory(category: HAND_TOOLS | POWER_TOOLS | OTHER | CATEGORIES): Promise<[string[], string[]]> {
        await this.categories.getByText(category).check();
        const responsePromise = this.page.waitForResponse((response) =>
            response.url().includes('/products?between=')
            && response.status() === 200
            && response.request().method() === 'GET',
        );
        const response = await responsePromise;
        const { data } = await response.json() as { data: apiResponse[] };
        const apiSortedProducts = data.map((product) => product.name);
        const apiSortedProductsCategories = data.map((product => { return product.category.name}));
        return [apiSortedProducts, apiSortedProductsCategories];
    }

    async getProductNames(): Promise<string[]> {
        const productNames = await this.productName.allTextContents();
        return productNames.map(name =>  name.trim());
    }

    async getProductPrices(): Promise<number[]> {
        const productPrices = await this.price.allTextContents();
        return (productPrices.map((price)=>{return parseFloat(price.slice(1))}));
    }

    async verifySorting(sortBy: SortOption): Promise<void> {
        const sortedApiProductNames: string[] = await this.selectSortOption(sortBy);
        switch (sortBy) {
            case 'Name (A - Z)': {
                const uiProductNames = await this.getProductNames();
                const sortedProductNames = uiProductNames.toSorted();
  
                expect(uiProductNames).toEqual(sortedApiProductNames);
                expect(uiProductNames).toEqual(sortedProductNames);
                break;
            };
            case 'Name (Z - A)': {
                const uiProductNames = await this.getProductNames();
                const sortedProductNames = uiProductNames.toSorted((a, b) => b.localeCompare(a));

                expect(uiProductNames).toEqual(sortedApiProductNames);
                expect(uiProductNames).toEqual(sortedProductNames);
                break;
            };
            case 'Price (Low - High)': {
                const uiProductNames = await this.getProductNames();
                const uiProductPrices = await this.getProductPrices();
                const sortedProductPrices = uiProductPrices.toSorted((a, b) => a - b);
 
                expect(uiProductNames).toEqual(sortedApiProductNames);
                expect(uiProductPrices).toEqual(sortedProductPrices);
                break;
            };
            case 'Price (High - Low)': {
                const uiProductNames = await this.getProductNames();
                const uiProductPrices = await this.getProductPrices();
                const sortedProductPrices = uiProductPrices.toSorted((a, b) => b - a);

                expect(uiProductNames).toEqual(sortedApiProductNames);
                expect(uiProductPrices).toEqual(sortedProductPrices);
                break;
            };
    
        }
    }




}
