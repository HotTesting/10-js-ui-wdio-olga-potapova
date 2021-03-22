// Use http://93.126.97.71:10082/mp3-players to simplify these tests. Mp3 players does not have custom params on details page.
import { App } from '../../../application/application'
import { WaitHelper } from '../../../helpers/wait.helper'
import { DataHelper } from '../../../helpers/data.helper'

const waitHelper = new WaitHelper()
const dataHelper = new DataHelper()

const products = [
    {
        name: 'iPod Classic',
        discountPrice: '$100.00',
        price: '$122.00'
    },
    {
        name: 'iPod Nano',
        discountPrice: '$100.00',
        price: '$122.00'
    },
    {
        name: 'iPod Shuffle',
        discountPrice: '$100.00',
        price: '$122.00'
    },
    {
        name: 'iPod Touch',
        discountPrice: '$100.00',
        price: '$122.00'
    }
]

/*after clicking 'Comparison' page scrolls up to successful message so that click to product
in next forEach iteration can be misplaced (product details will be open instead), so that 
test should wait for page stopped scrolling before clicking the next product*/
/*in real project I would place it into some wait helper, now saved here just to make homework
check easier*/

beforeEach(function () {
    browser.deleteCookies()
})

describe('Items', function () {
    it.only('can be added to wishlist', function () {
        const app = new App()
        const user = dataHelper.getUser()

        //app.registration.open()
        app.registration.registerViaApi(user)
        browser.url('/index.php?route=account/login');
        $('input#input-email').setValue(user.email);
        $('input#input-password').setValue(user.password);
        $('input[type="submit"]').click();
        app.home.openAllForCategory('MP3 Players')
        products.forEach(product => {
            const itemToAdd = app.productCategory.products.find(pr => pr.title() === product.name)
            expect(itemToAdd).toBeDefined()
            itemToAdd.addToWishList()
            expect(app.productCategory.successMessage.message).toHaveTextContaining('Success: You have added', {
                message: 'Success message doesn\'t contain success text'
            })
            waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 100/*milliseconds*/)
        })
        app.productCategory.successMessage.openWishListFromSuccessMessage()
        expect(app.wishList.quantity).toEqual(4)
        expect(app.wishList.prices).toEqual(products.map(product => product.price))
    })

    it('can be selected for comparison by registered user', function () {
        const app = new App()
        const user = dataHelper.getUser()
        app.registration.open()
        app.registration.register(user)
        app.home.openAllForCategory('MP3 Players')
        products.forEach(product => {
            const itemToAdd = app.productCategory.products.find(pr => pr.title() === product.name)
            expect(itemToAdd).toBeDefined()
            itemToAdd.compareThisProduct()
            expect(app.productCategory.successMessage.message).toHaveTextContaining('Success: You have added', {
                message: 'Success message doesn\'t contain success text'
            })
            waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 100/*milliseconds*/)
        })
        app.productCategory.successMessage.openCompareFromSuccessMessage()
        expect(app.compareTable.quantity).toEqual(4)
        expect(app.compareTable.prices).toEqual(['Price', ...products.map(product => product.price)])
    })

    it('can be selected for comparison by guest', function () {
        const app = new App()
        app.home.openAllForCategory('MP3 Players')
        products.forEach(product => {
            const itemToAdd = app.productCategory.products.find(pr => pr.title() === product.name)
            expect(itemToAdd).toBeDefined()
            itemToAdd.compareThisProduct()
            expect(app.productCategory.successMessage.message).toHaveTextContaining('Success: You have added', {
                message: 'Success message doesn\'t contain success text'
            })
            waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 100/*milliseconds*/)
        })
        app.productCategory.successMessage.openCompareFromSuccessMessage()
        expect(app.compareTable.quantity).toEqual(4)
        expect(app.compareTable.prices).toEqual(['Price', ...products.map(product => product.price)])
    })

    products.forEach(product => it('can be added to cart by guest', function () {
        const app = new App()
        app.home.openAllForCategory('MP3 Players')
        const item = app.productCategory.products.find(pr => pr.title() === product.name)
        expect(item).toBeDefined()
        item.addToCart()
        waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 100/*milliseconds*/)
        app.productCategory.successMessage.openCartFromSuccessMessage()
        expect(app.shoppingCart.quantity).toEqual(1)
        expect(app.shoppingCart.prices).toEqual([product.price])
        expect(app.shoppingCart.numberOfProducts).toEqual(['1'])
    })
    )

    products.forEach(product => it('can be added to cart by registered user', function () {
        const app = new App()
        const user = dataHelper.getUser()
        app.registration.open()
        app.registration.register(user)
        app.productCategory.open('/mp3-players')
        const item = app.productCategory.products.find(pr => pr.title() === product.name)
        expect(item).toBeDefined()
        item.addToCart()
        waitHelper.waitForPageStopScrolling(/*up to*/20/*times*/, 100/*milliseconds*/)
        app.productCategory.successMessage.openCartFromSuccessMessage()
        expect(app.shoppingCart.quantity).toEqual(1)
        expect(app.shoppingCart.prices).toEqual([product.price])
        expect(app.shoppingCart.numberOfProducts).toEqual(['1'])
    })
    )
})
