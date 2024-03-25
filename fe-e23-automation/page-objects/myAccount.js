const { expect } = require("@playwright/test");

class MyAccount {
  constructor(page) {
    //locators
    this.page = page;
    this.loginH = page.locator('//h2[text()="Login"]');
    this.registerH = page.locator('//h2[text()="Register"]');
    this.loginUserNameInput = page.locator("#username");
    this.registerUserEmailInput = page.locator("#reg_email");
    this.registerPasswordInput = page.locator("#reg_password");
    this.loginPassInput = page.locator("#password");
    this.loginButton = page.locator('input[name="login"]');
    this.registerButton = page.locator('input[name="register"]');
    this.usernameSignIn = page.locator("//p/strong");
    this.errorBanner = page.locator(".woocommerce-error");
  }

  async verLoginheader() {
    expect(this.loginH).toBeVisible;
  }

  async verRegisterheader() {
    expect(this.registerH).toBeVisible;
  }

  async fillUserName(username) {
    await this.loginUserNameInput.type(username);
  }

  async fillUserEmail(email) {
    await this.registerUserEmailInput.type(email);
  }

  async fillRegisterPassword(password) {
    await this.registerPasswordInput.type(password);
  }

  async fillPassInput(password) {
    await this.loginPassInput.type(password);
  }

  async isErrorVisisble() {
    expect(this.errorBanner).toBeVisible;
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async verUsername(username) {
    await expect(this.usernameSignIn).toHaveText(username);
  }
  
  async expectRegisterToBeEnabled() {
    await expect(this.registerButton).toBeEnabled;
  }
}
module.exports = { MyAccount };
