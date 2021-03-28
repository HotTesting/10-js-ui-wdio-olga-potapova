import { App } from '../../application/application'
import { DataHelper } from '../../helpers/data.helper'

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
    it('can be added to wishlist', function () {
        const app = new App()
        const user = dataHelper.getUser()
        app.registration.registerAndLogin(user)
        app.home.openAllForCategory('MP3 Players')
        products.forEach(product => {
            const itemToAdd = app.productCategory.products.find(pr => pr.title() === product.name)
            expect(itemToAdd).toBeDefined()
            itemToAdd.addToWishList()
            expect(app.productCategory.successMessage.message).toHaveTextContaining('Success: You have added', {
                message: 'Success message doesn\'t contain success text'
            })
            browser.waitForPageStopScrolling()
        })
        app.productCategory.successMessage.openWishListFromSuccessMessage()
        expect(app.wishList.quantity).toEqual(4)
        expect(app.wishList.prices).toEqual(products.map(product => product.price))
    })

    it('can be selected for comparison by returned customers (price should be discounted)', function () {
        const app = new App()
        const user = dataHelper.getUser()
        app.registration.registerViaApi(user)
        app.login.open();
        app.login.guickLogin({
            email: user.email,
            password: user.password
        })
        app.home.openAllForCategory('MP3 Players')
        products.forEach(product => {
            const itemToAdd = app.productCategory.products.find(pr => pr.title() === product.name)
            expect(itemToAdd).toBeDefined()
            itemToAdd.compareThisProduct()
            expect(app.productCategory.successMessage.message).toHaveTextContaining('Success: You have added', {
                message: 'Success message doesn\'t contain success text'
            })
            browser.waitForPageStopScrolling()
        })
        app.productCategory.successMessage.openCompareFromSuccessMessage()
        expect(app.compareTable.quantity).toEqual(4)
        expect(app.compareTable.prices).toEqual(['Price', ...products.map(product => product.discountPrice)])
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
            browser.waitForPageStopScrolling()
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
        browser.waitForPageStopScrolling()
        app.productCategory.successMessage.openCartFromSuccessMessage()
        expect(app.shoppingCart.quantity).toEqual(1)
        expect(app.shoppingCart.prices).toEqual([product.price])
        expect(app.shoppingCart.numberOfProducts).toEqual(['1'])
    })
    )

    products.forEach(product => it('can be added to cart by registered user', function () {
        const app = new App()
        const user = dataHelper.getUser()
        app.registration.registerViaApi(user)
        app.login.open();
        app.login.guickLogin({
            email: user.email,
            password: user.password
        })
        app.productCategory.open('/mp3-players')
        const item = app.productCategory.products.find(pr => pr.title() === product.name)
        expect(item).toBeDefined()
        item.addToCart()
        browser.waitForPageStopScrolling()
        app.productCategory.successMessage.openCartFromSuccessMessage()
        expect(app.shoppingCart.quantity).toEqual(1)
        expect(app.shoppingCart.prices).toEqual([product.discountPrice])
        expect(app.shoppingCart.numberOfProducts).toEqual(['1'])
    })
    )

    it('should add to the cart item from details', function () {
        const app = new App()
        app.productCategory.open('/camera')
        const item = app.productCategory.products.find(pr => pr.title() === 'Canon EOS 5D')
        expect(item).toBeDefined()
        item.openDetails()
        app.productDetails.selectOptionFromSelector('Blue')
        app.productDetails.enterQuantity('2')
        app.productDetails.addToCart()
        browser.waitForPageStopScrolling()
        expect(app.productDetails.successMessage.message).toHaveTextContaining('Success: You have added Canon EOS 5D to your shopping cart!')
        app.productDetails.successMessage.openCartFromSuccessMessage()
        expect(app.shoppingCart.quantity).toEqual(1)
        expect(app.shoppingCart.prices).toEqual(['$98.00'])
        expect(app.shoppingCart.numberOfProducts).toEqual(['2'])
    })

    it('should add to the cart item with full set of options', function () {
        const app = new App()
        app.productCategory.open('/component/monitor')
        const item = app.productCategory.products.find(pr => pr.title() === 'Apple Cinema 30"')
        expect(item).toBeDefined()
        item.openDetails()
        app.productDetails.selectOptionFromCheckboxes('Checkbox 1')
        app.productDetails.selectOptionFromRadios('Medium (+$24.00)')
        app.productDetails.productParameters.appleCinema30.typeText('Test')
        app.productDetails.selectOptionFromSelector('Blue (+$3.60)')
        app.productDetails.productParameters.appleCinema30.typeTextArea('Test')
        app.productDetails.productParameters.appleCinema30.chooseDate('2021-03-25')
        app.productDetails.productParameters.appleCinema30.chooseTime('14:00')
        app.productDetails.productParameters.appleCinema30.chooseDateAndTime('2022-03-25 12:00')
        app.productDetails.enterQuantity('2')
        app.productDetails.addToCart()
        browser.waitForPageStopScrolling()
        expect(app.productDetails.successMessage.message).toHaveTextContaining('Success: You have added')
        app.productDetails.successMessage.openCartFromSuccessMessage()
        expect(app.shoppingCart.quantity).toEqual(1)
        expect(app.shoppingCart.prices).toEqual(["$149.60"])
        expect(app.shoppingCart.numberOfProducts).toEqual(['2'])
    })
})
