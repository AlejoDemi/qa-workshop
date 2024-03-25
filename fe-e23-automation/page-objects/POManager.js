const { TopNav } = require('./topNav');
const { MyAccount } = require('./myAccount');
const { Home } = require('./home');
const { Shop } = require('./shop');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.topNav = new TopNav(this.page);
        this.myAccount = new MyAccount(this.page);
        this.home = new Home(this.page);
        this.shop = new Shop(this.page);
    }


    getTopNav()
    {
        return this.topNav;
    }

    getMyAccount()
    {
        return this.myAccount;
    }

    getHome() {
        return this.home;
    }

    getShop() {
        return this.shop;
    }
   
}
module.exports = { POManager };