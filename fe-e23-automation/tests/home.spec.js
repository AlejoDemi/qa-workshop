const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../test-data/testdata.json")));

let poManager;
let topNav;
let home;

// https://practice.automationtesting.in/test-cases/

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    home = poManager.getHome();
    topNav = poManager.getTopNav();

    await page.goto(dataset.home.url, { viewport: null });
    expect(page).toHaveTitle(dataset.home.title);
});

test('1.Home page has Three Sliders only', async () => {
    await test.step('Click on Shop menu button', async () => {
        await topNav.clickShopButton();
    })
    await test.step('Click Home menu button', async () => {
        await topNav.clickHomeButton();
    });
    await test.step('Must contain only 3 sliders', async () => {
        await home.expectNumberOfSliders(3);
    });
});

test('2. Home Page with Three Arrivals only.', async () => {
    await test.step('Click on Shop menu button', async () => {
        await topNav.clickShopButton();
    })
    await test.step('Click Home menu button', async () => {
        await topNav.clickHomeButton();
    });
    await test.step('Must contain only 3 arrivals', async () => {
        await home.expectNumberOfArrivals(3);
    });
});