// Use http://93.126.97.71:10082/mp3-players to simplify these tests. Mp3 players does not have custom params on details page.
// bonus points:
// - use preconditions
// - use dataprovider
const products = [
    {
        name: 'iPod Classic',
        price: '$100.00',
        guestPrice: '$122.00'
    },
    {
        name: 'iPod Nano',
        price: '$100.00',
        guestPrice: '$122.00'
    },
    {
        name: 'iPod Shuffle',
        price: '$100.00',
        guestPrice: '$122.00'
    },
    {
        name: 'iPod Touch',
        price: '$100.00',
        guestPrice: '$122.00'
    }
]

const register = () => {
    browser.url('/index.php?route=account/register');
    browser.pause(2000);
    const content = $('#content');
    const firstName = content.$('#input-firstname');
    firstName.setValue('Test');
    const lastName = content.$('#input-lastname');
    lastName.setValue('Test');
    const email = content.$('#input-email');
    email.setValue(`Test${Date.now()}@example.com`);
    const phone = content.$('#input-telephone');
    phone.setValue('111111111111111');
    const password = content.$('#input-password');
    password.setValue('2222');
    const passwordConfirm = content.$('#input-confirm');
    passwordConfirm.setValue('2222');
    const policy = content.$('input[type="checkbox"][name="agree"]');
    policy.click();
    const continueButton = content.$('input[type="submit"][value="Continue"]');
    continueButton.click();
    const heading = content.$('h1');
    expect(heading).toHaveText('Your Account Has Been Created!');
}

before(function(){
    browser.maximizeWindow();
});

beforeEach(function() {
    browser.deleteCookies();
})

describe('Items', function () {
    it('can be added to wishlist', function () {
        register();
        browser.url('/mp3-players');
        browser.pause(3000);
        const content = $('#content');
        
        const item = 'iPod Classic';
        const itemContainers = content.$$('div.product-grid');
        const [ itemToAdd ] = itemContainers.filter(el => el.$('h4').getText() === item);

        const addToWishListButton = itemToAdd.$('i.fa-heart');
        addToWishListButton.click();
        browser.pause(500);

        const successfullMessage = $('div.alert-success');
        expect(successfullMessage).toHaveTextContaining('Success: You have added', {
            wait: 3000,
            message: 'No successful message is shown'
        });
    })

    //make a test for each product
    products.map(product => {
        it('can be selected for comparison by registered user', function () {
            register();
            browser.url('/mp3-players');
            browser.pause(500);

            const content = $('#content');
            const successfullMessage = $('div.alert-success');

            const itemContainers = content.$$('div.product-grid');
            const [itemToAdd] = itemContainers.filter(el => el.$('h4').getText() === product.name);
            const addToComparisonButton = itemToAdd.$('i.fa-exchange');
            addToComparisonButton.click();
            browser.pause(500);
            expect(successfullMessage).toHaveTextContaining('Success: You have added', {
                wait: 3000,
                message: 'No successful message is shown'
            });

            const comparisonLink = successfullMessage.$('a[href*="compare"]');
            //to do: go to comparison and check parameters
        })

        it('can be selected for comparison by guest', function () {
            browser.url('/mp3-players');
            browser.pause(3000);
            const content = $('#content');
            const successfullMessage = $('div.alert-success');

            const itemContainers = content.$$('div.product-grid');
            const [itemToAdd] = itemContainers.filter(el => el.$('h4').getText() === product.name);
            const addToComparisonButton = itemToAdd.$('i.fa-exchange');
            addToComparisonButton.click();
            browser.pause(500);
            expect(successfullMessage).toHaveTextContaining('Success: You have added', {
                wait: 3000,
                message: 'No successful message is shown'
            });

            const comparisonLink = successfullMessage.$('a[href*="compare"]');
            //to do: go to comparison and check parameters
        })
    })

    //iterate objects inside of test
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
        const successfullMessage = $('div.alert-success');

        //add all four mp3 players to card
        products.forEach(item => {
            const itemContainers = content.$$('div.product-grid');
            const [ itemToAdd ] = itemContainers.filter(el => el.$('h4').getText() === item.name);
    
            const addToCartButton = itemToAdd.$('i.fa-shopping-cart');
            addToCartButton.click();
            browser.pause(500);
    
            expect(successfullMessage).toHaveTextContaining('Success: You have added', {
                wait: 3000,
                message: 'No successful message is shown'
            });
        })
        
        //open cart
        const cartLink = successfullMessage.$('a[href*="cart"]');
        cartLink.click();
        browser.pause(500);

        //check that 4 items are added 
        const elementsInCart = content.$$('div.table-responsive tbody tr');
        expect(elementsInCart.length).toEqual(4);

        //check that correct parameters are shown
        elementsInCart.forEach(el => {
            let quantity = el.$('input[name*=quantity]');
            expect(quantity.getValue()).toBe('1');
        })
    })

     //iterate objects inside of test
    it('can be added to cart by registered user', function () {
        register();
        const content = $('#content');
        browser.url('/mp3-players');
        browser.pause(3000);

        const successfullMessage = $('div.alert-success');
        products.forEach(item => {
            const itemContainers = content.$$('div.product-grid');
            const [ itemToAdd ] = itemContainers.filter(el => el.$('h4').getText() === item.name);
    
            const addToCartButton = itemToAdd.$('i.fa-shopping-cart');
            addToCartButton.click();
            browser.pause(500);
            expect(successfullMessage).toHaveTextContaining('Success: You have added', {
                wait: 3000,
                message: 'No successful message is shown'
            });
        })
        
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
