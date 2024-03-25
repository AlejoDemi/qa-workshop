const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../test-data/testdata.json")));

let poManager;
let topNav;
let myAccount;

test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    topNav = poManager.getTopNav();
    myAccount = poManager.getMyAccount();

    await page.goto(dataset.home.url);
    expect(page).toHaveTitle(dataset.home.title);
});


test('Rgister with valid username and password.', async () => {
    await test.step(' Click on My Account Menu', async () => {
        await topNav.clickMyAccountButton();
        await myAccount.verRegisterheader();
    })
    await test.step('Enter email in email textbox', async () => {
        await myAccount.fillUserEmail(dataset.newUser.email);
    });
    await test.step('Enter password in password textbox', async () => {
        await myAccount.fillRegisterPassword(dataset.newUser.password);
    });
    await test.step('Click on register button', async () => {
        await myAccount.clickRegisterButton();
    });
    await test.step('User must successfully register to the web page', async () => {
        await myAccount.expectRegisterToBeEnabled();
    });
});