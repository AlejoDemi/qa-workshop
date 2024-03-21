const { TopNav } = require('./topNav');
const { MyAccount } = require('./myAccount');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.topNav = new TopNav(this.page);
        this.myAccount = new MyAccount(this.page);
    }


    getTopNav()
    {
        return this.topNav;
    }

    getMyAccount()
    {
        return this.myAccount;
    }
   
}
module.exports = { POManager };