const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../test-data/testdata.json")));

let poManager;
let topNav;
let shop;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    topNav = poManager.getTopNav();
    shop = poManager.getShop();

    await page.goto(dataset.home.url);
    expect(page).toHaveTitle(dataset.home.title);
});

test('Shop - Products Categories Functionality',async ()=> {
 await test.step("Click on shop button", async ()=> {
    await topNav.clickShopButton()
 })

 await('Click on android category', async ()=>{
    await shop.clickAndroidFilter()
 })

 await('There should be only 1 product', async ()=>{
    await expectProductListCount(1)
 })
})
