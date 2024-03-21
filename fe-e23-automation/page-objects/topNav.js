const { expect } = require('@playwright/test');

class TopNav
{
    constructor(page)
    {
        //locators
        this.page = page;
        // locators - My account button
        this.myAccountButton1 = page.locator("#menu-item-50"); //CSS - id
        this.myAccountButton2 = page.locator("//a[@href='https://practice.automationtesting.in/my-account/']"); //Xpaht - relative
        this.myAccountButton3 = page.locator("//*[@id='main-nav']/li[2]']"); //Xpaht - parent element
        this.myAccountButton4 = page.getByLabel("My Account"); //Playwright built in locators https://playwright.dev/docs/api/class-framelocator#frame-locator-get-by-label
        this.myAccountButton5 = page.locator("/html/body/div[1]/div[1]/header/div[2]/nav/ul/li[2]"); //Absolute -Xpath 
        

    }

    async clickMyAccountButton()
    {
        await this.myAccountButton1.click();
    }

}
module.exports = { TopNav };