const { expect } = require('@playwright/test');

class MyAccount
{
    constructor(page)
    {
        //locators
        this.page = page;
        this.loginH = page.locator('//h2[text()="Login"]');
        this.loginUserNameInput = page.locator('#username');
        this.loginPassInput = page.locator('#password');
        this.loginButton = page.locator('input[name="login"]');
        this.usernameSignIn = page.locator('//p/strong');

    }

    async verLoginheader()
    {
        expect(this.loginH).toBeVisible;
    }

    async fillUserName(username)
    {
        await this.loginUserNameInput.type(username)
    }
    
    async fillPassInput(password)
    {
        await this.loginPassInput.type(password);
    }

    async clickLoginButton()
    {
        await this.loginButton.click();
    }

    async verUsername(username)
    {
        await expect(this.usernameSignIn).toHaveText(username);
    }
}
module.exports = { MyAccount };