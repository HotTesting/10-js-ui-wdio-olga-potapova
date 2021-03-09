// Use http://93.126.97.71:10082/mp3-players to simplify these tests. Mp3 players does not have custom params on details page.
// bonus points:
// - use preconditions
// - use dataprovider
const user = {
    
    email: 'jamesdean@example.com',
    password: '123456'
}

before(function(){
    browser.maximizeWindow();
});

afterEach(function() {
    browser.deleteCookies();
})

describe('Items', function () {
    // You must be logged in to use wishlist
    it('can be added to wishlist', function () {

        browser.url('/index.php?route=account/login');
        const content = $('#content');
        const email = content.$('#input-email');
        email.setValue(user.email);
        const password = content.$('#input-password');
        password.setValue(user.password);
        const submitButton = content.$('input[type="submit"]');
        submitButton.click();

        const myAccount = $('#top a.dropdown-toggle');
        myAccount.click();
        const logout = $('#top li a[href*=logout]')
        expect(logout).toBeDisplayed({
            wait: 3000,
            message: 'User is not logged in the shop as logout link is not shown'
        });

        browser.url('/mp3-players');
        browser.pause(3000);
        //const content = $('#content');
        
        const item = 'iPod Classic';
        const itemContainers = content.$$('div.product-grid');
        const [ itemToAdd ] = itemContainers.filter(el => el.$('h4').getText() === item);

        const addToWishListButton = itemToAdd.$('i.fa-heart');
        addToWishListButton.click();

        const successfullMessage = $('div.alert-success');
        expect(successfullMessage).toHaveTextContaining('Success: You have added', {
            wait: 3000,
            message: 'No successful message is shown'
        });
    })

    it('can be selected for comparison by registered user', function () {
        browser.url('/index.php?route=account/login');
        const content = $('#content');
        const email = content.$('#input-email');
        email.setValue(user.email);
        const password = content.$('#input-password');
        password.setValue(user.password);
        const submitButton = content.$('input[type="submit"]');
        submitButton.click();

        const myAccount = $('#top a.dropdown-toggle');
        myAccount.click();
        const logout = $('#top li a[href*=logout]')
        expect(logout).toBeDisplayed({
            wait: 3000,
            message: 'User is not logged in the shop as logout link is not shown'
        });

        browser.url('/mp3-players');
        browser.pause(3000);
        //const content = $('#content');
        
        const item = 'iPod Classic';
        const itemContainers = content.$$('div.product-grid');
        const [ itemToAdd ] = itemContainers.filter(el => el.$('h4').getText() === item);

        const addToComparisonButton = itemToAdd.$('i.fa-exchange');
        addToComparisonButton.click();

        const successfullMessage = $('div.alert-success');
        expect(successfullMessage).toHaveTextContaining('Success: You have added', {
            wait: 3000,
            message: 'No successful message is shown'
        });

        const comparisonLink = successfullMessage.$('a[href*="compare"]');
        comparisonLink.click();
        browser.pause(3000);
        const elementsInComparison = $$('td img');
        expect(elementsInComparison.length).toEqual(4)
    })

    it('can be selected for comparison by guest', function () {
        browser.url('/mp3-players');
        browser.pause(3000);
        const content = $('#content');

        const myAccount = $('#top a.dropdown-toggle');
        myAccount.click();
        const login = $('#top li a[href*=login]')
        expect(login).toBeDisplayed({
            wait: 3000,
            message: 'User IS logged in the shop as login link is not shown'
        });
        
        const item = 'iPod Classic';
        const itemContainers = content.$$('div.product-grid');
        const [ itemToAdd ] = itemContainers.filter(el => el.$('h4').getText() === item);

        const addToComparisonButton = itemToAdd.$('i.fa-exchange');
        addToComparisonButton.click();

        const successfullMessage = $('div.alert-success');
        expect(successfullMessage).toHaveTextContaining('Success: You have added', {
            wait: 3000,
            message: 'No successful message is shown'
        });

        const comparisonLink = successfullMessage.$('a[href*="compare"]');
        comparisonLink.click();
        browser.pause(3000);
        const elementsInComparison = $$('td img');
        expect(elementsInComparison.length).toEqual(4)
    })

    it('can be added to cart by guest', function () {
        browser.url('/mp3-players');
        browser.pause(3000);

        const myAccount = $('#top a.dropdown-toggle');
        myAccount.click();
        const login = $('#top li a[href*=login]')
        expect(login).toBeDisplayed({
            wait: 3000,
            message: 'User IS logged in the shop as login link is not shown'
        });

        const content = $('#content');
        const item = 'iPod Classic';
        const itemContainers = content.$$('div.product-grid');
        const [ itemToAdd ] = itemContainers.filter(el => el.$('h4').getText() === item);

        const addToCartButton = itemToAdd.$('i.fa-shopping-cart');
        addToCartButton.click();

        const successfullMessage = $('div.alert-success');
        expect(successfullMessage).toHaveTextContaining('Success: You have added', {
            wait: 3000,
            message: 'No successful message is shown'
        });

        const cartLink = successfullMessage.$('a[href*="cart"]');
        cartLink.click();
        browser.pause(3000);
        const elementsInCart = content.$$('div.table-responsive tbody tr');
        expect(elementsInCart.length).toEqual(4);

        elementsInCart.forEach(el => {
            let quantity = el.$('input[name*=quantity]');
            expect(quantity.getValue()).toBe('1');
        })
    })

    it('can be added to cart by registered user', function () {
        browser.url('/index.php?route=account/login');
        const content = $('#content');
        const email = content.$('#input-email');
        email.setValue(user.email);
        const password = content.$('#input-password');
        password.setValue(user.password);
        const submitButton = content.$('input[type="submit"]');
        submitButton.click();

        browser.url('/mp3-players');
        browser.pause(3000);
        const myAccount = $('#top a.dropdown-toggle');
        myAccount.click();
        const logout = $('#top li a[href*=logout]')
        expect(logout).toBeDisplayed({
            wait: 3000,
            message: 'User is not logged in the shop as logout link is not shown'
        });

        //const content = $('#content');
        const item = 'iPod Classic';
        const itemContainers = content.$$('div.product-grid');
        const [ itemToAdd ] = itemContainers.filter(el => el.$('h4').getText() === item);

        const addToCartButton = itemToAdd.$('i.fa-shopping-cart');
        addToCartButton.click();

        const successfullMessage = $('div.alert-success');
        expect(successfullMessage).toHaveTextContaining('Success: You have added', {
            wait: 3000,
            message: 'No successful message is shown'
        });

        const cartLink = successfullMessage.$('a[href*="cart"]');
        cartLink.click();
        browser.pause(3000);
        const elementsInCart = content.$$('div.table-responsive tbody tr');
        expect(elementsInCart.length).toEqual(4);

        elementsInCart.forEach(el => {
            let quantity = el.$('input[name*=quantity]');
            expect(quantity.getValue()).toBe('1');
        })
    })
})
