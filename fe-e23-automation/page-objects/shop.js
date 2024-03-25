const { expect } = require('@playwright/test');

class Shop {
    constructor(page) {
        //locators
        this.page = page;
        this.androidFilter = page.locator("//a[@href='https://practice.automationtesting.in/product-category/android/']")
        this.products = page.locator('//*[@id="content"]/ul/li')
    }

    async clickAndroidFilter() {
        await this.androidFilter.click();
    }

    async expectProductListCount(number) {
        expect(await this.products.count()).toBe(number);
    }
}
module.exports = { Shop };