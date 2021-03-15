// Use http://93.126.97.71:10082/mp3-players to simplify these tests. Mp3 players does not have custom params on details page.
import { App } from "../../../application/application";
import { WaitHelper } from "../../../helpers/wait.helper";
import { DataHelper } from "../../../helpers/data.helper"

const waitHelper = new WaitHelper();
const dataHelper = new DataHelper();

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

/*after clicking 'Comparison' page scrolls up to successful message so that click to product
in next forEach iteration can be misplaced (product details will be open instead), so that 
test should wait for page stopped scrolling before clicking the next product*/
/*in real project I would place it into some wait helper, now saved here just to make homework
check easier*/

beforeEach(function () {
    browser.deleteCookies();
})

describe('Items', function () {
    it('can be added to wishlist', function () {
        const app = new App();
        const user = dataHelper.getUser();
        app.registration.open();
        app.registration.register(user)

        app.home.openAllForCategory('MP3 Players')
        products.forEach(product => {
            const itemToAdd = app.productCategory.products.find(pr => pr.title() === product.name);
            expect(itemToAdd).toBeDefined();
            itemToAdd.addToWishList();
            expect(app.productCategory.successMessage.message).toHaveTextContaining('Success: You have added', {
                message: 'Success message doesn\'t contain success text'
            })
            waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 100/*milliseconds*/);
        });
        app.productCategory.successMessage.openWishListFromSuccessMessage();
        expect(app.wishList.quantity).toEqual(4);
        //there is a bug! on automated testing mode it opens guest prices (122 instead of 100), login is saved though
        expect(app.wishList.prices).toEqual(products.map(product => product.price));
    })

    //iterate objects in test
    it('can be selected for comparison by registered user', function () {
        const app = new App();
        const user = dataHelper.getUser();
        app.registration.open();
        app.registration.register(user)
        app.home.openAllForCategory('MP3 Players')
        const content = $('#content');
        const heading = content.$('h2');
        expect(heading).toHaveText('MP3 Players', {
            wait: 5000,
            message: 'No products are shown on the page'
        })
        const successfullMessage = $('div.alert-success');

        products.forEach(product => {
            const itemContainers = content.$$('div.product-grid');
            const [itemToAdd] = itemContainers.filter(el => el.$('h4').getText() === product.name);
            const addToComparisonButton = itemToAdd.$('i.fa-exchange');
            addToComparisonButton.click();
            expect(successfullMessage).toHaveTextContaining('Success: You have added', {
                wait: 3000,
                message: 'No successful message is shown'
            });
            waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 50/*milliseconds*/);
        })

        const comparisonLink = successfullMessage.$('a[href*="compare"]');
        expect(comparisonLink).toHaveTextContaining('product comparison', {
            wait: 5000,
            message: 'No successful message is shown'
        });
        comparisonLink.click();
        const elementsInComparison = content.$$('tbody tr td img');
        expect(elementsInComparison.length).toEqual(4);

        const comparisonTableRows = content.$$('tbody tr');
        const [priceRows] = comparisonTableRows.filter(row => row.$('td:first-of-type').getText() == 'Price');
        const priceValues = priceRows.$$('td').map(row => row.getText());
        //there is a bug! on automated testing mode it opens guest prices (122 instead of 100), login is saved though
        expect(priceValues).toEqual(['Price', ...products.map(product => product.price)]);
    })

    it('can be selected for comparison by guest', function () {
        const app = new App();
        app.home.openAllForCategory('MP3 Players')
        const content = $('#content');
        const heading = content.$('h2');
        expect(heading).toHaveText('MP3 Players', {
            wait: 5000,
            message: 'No products are shown on the page'
        })
        const successfullMessage = $('div.alert-success');
        products.forEach(product => {
            const itemContainers = content.$$('div.product-grid');
            const [itemToAdd] = itemContainers.filter(el => el.$('h4').getText() === product.name);
            const addToComparisonButton = itemToAdd.$('i.fa-exchange');
            addToComparisonButton.click();
            expect(successfullMessage).toHaveTextContaining('Success: You have added', {
                wait: 3000,
                message: 'No successful message is shown'
            });
            waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 50/*milliseconds*/);
        })
        const comparisonLink = successfullMessage.$('a[href*="compare"]');
        expect(comparisonLink).toHaveTextContaining('product comparison', {
            wait: 5000,
            message: 'No successful message is shown'
        });
        comparisonLink.click();
        const elementsInComparison = content.$$('tbody tr td img');
        expect(elementsInComparison.length).toEqual(4);
        const comparisonTableRows = content.$$('tbody tr');
        const [priceRows] = comparisonTableRows.filter(row => row.$('td:first-of-type').getText() == 'Price');
        const priceValues = priceRows.$$('td').map(row => row.getText());
        expect(priceValues).toEqual(['Price', ...products.map(product => product.guestPrice)]);
    })

    //perform single test for each item
    products.forEach(product => it('can be added to cart by guest', function () {
        const app = new App();
        app.home.openAllForCategory('MP3 Players')
        const content = $('#content');
        const heading = content.$('h2');
        expect(heading).toHaveText('MP3 Players', {
            wait: 5000,
            message: 'No products are shown on the page'
        })
        const successfullMessage = $('div.alert-success');

        //add all four mp3 players to card
        const itemContainers = content.$$('div.product-grid');
        const [itemToAdd] = itemContainers.filter(el => el.$('h4').getText() === 'iPod Classic');

        const addToCartButton = itemToAdd.$('i.fa-shopping-cart');
        addToCartButton.click();
        expect(successfullMessage).toHaveTextContaining('Success: You have added', {
            wait: 5000,
            message: 'No successful message is shown'
        });
        waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 50/*milliseconds*/);

        //open cart
        const cartLink = successfullMessage.$('a[href*="cart"]');
        cartLink.click();
        const elementInCart = content.$('div.table-responsive tbody tr');
        expect(elementInCart).toBeDisplayed({
            wait: 5000,
            message: 'There are no products in the cart'
        })

        let quantity = elementInCart.$('input[name*=quantity]');
        expect(quantity.getAttribute('value')).toBe('1');

        let price = elementInCart.$('.//td[5]');
        expect(price.getText()).toEqual('$122.00');
    })
    );


    //iterate objects inside of test
    products.map(product => it('can be added to cart by registered user', function () {
        const app = new App();
        app.home.openAllForCategory('MP3 Players')
        const user = dataHelper.getUser();
        app.registration.open();
        app.registration.register(user)
        const content = $('#content');
        browser.url('/mp3-players');
        const heading = content.$('h2');
        expect(heading).toHaveText('MP3 Players', {
            wait: 5000,
            message: 'No products are shown on the page'
        })

        const successfullMessage = $('div.alert-success');
        const itemContainers = content.$$('div.product-grid');
        const [itemToAdd] = itemContainers.filter(el => el.$('h4').getText() === product.name);

        const addToCartButton = itemToAdd.$('i.fa-shopping-cart');
        addToCartButton.click();
        expect(successfullMessage).toHaveTextContaining('Success: You have added', {
            wait: 5000,
            message: 'No successful message is shown'
        });
        waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 50/*milliseconds*/);

        const cartLink = successfullMessage.$('a[href*="cart"]');
        cartLink.click();
        const elementInCart = content.$('div.table-responsive tbody tr');
        expect(elementInCart).toBeDisplayed({
            wait: 5000,
            message: 'There are no products in the cart'
        })

        let quantity = elementInCart.$('input[name*=quantity]');
        expect(quantity.getAttribute('value')).toBe('1');

        let price = elementInCart.$('.//td[5]');
        expect(price.getText()).toEqual('$122.00');
    })
    );
})
