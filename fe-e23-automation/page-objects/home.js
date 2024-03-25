const { expect } = require('@playwright/test');

class Home {
    constructor(page) {
        //locators
        this.page = page;
        this.sliders = page.locator('xpath=/html/body/div[1]/div[2]/div/div/div/div/div/div[1]/div/div/div/div/div/div/div/div[1]/div[1]/div/div')
        this.arrivals = page.locator('xpath=/html/body/div[1]/div[2]/div/div/div/div/div/div[2]/div/div/div/div/div[2]')
    }

    async expectNumberOfSliders(number) {
        expect(await this.sliders.count()).toBe(number)
    }

    async expectNumberOfArrivals(number) {
        expect(await this.arrivals.count()).toBe(number)
    }
}
module.exports = { Home };