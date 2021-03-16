import { App } from "../../../application/application"

beforeEach(function () {
    browser.deleteCookies();
})

describe('Item', function () {

    it('can be purchased by guest', function () {
        const app = new App()
        app.home.openAllForCategory('MP3 Players')
        const iPodShuffle = app.productCategory.products.find(product => product.title() === 'iPod Shuffle')
        expect(iPodShuffle).toBeDefined()
        iPodShuffle.addToCart()
        app.productCategory.topLinks.openCheckout();
        app.checkout.checkoutOptions.selectCheckoutOption('guest')
        app.checkout.checkoutOptions.continue()
        app.checkout.billingDetails.fillBillingDetails({
            firstName: 'test',
            lastName: 'test',
            email: `test+${Date.now()}@test.com`,
            telephone: '123123123',
            address1: 'test',
            city: 'Mensk',
            postCode: '123123',
            country: 'Belarus',
            region: 'Horad Minsk'
        })
        app.checkout.billingDetails.continue()
        app.checkout.deliveryMethod.continue()
        app.checkout.paymentMethod.acceptTermsAndConditions()
        app.checkout.paymentMethod.continue()
        app.checkout.confirmOrder.confirm()
        browser.waitUntil(() => app.confirmation.isOpened(), {
            timeoutMsg: "Expected confirmation page to be loaded"
        })
    })

    it('can be purchased by newly registered customer', function () {
        const app = new App()
        app.home.openAllForCategory('MP3 Players')
        const iPodShuffle = app.productCategory.products.find(product => product.title() === 'iPod Shuffle')
        expect(iPodShuffle).toBeDefined()
        iPodShuffle.addToCart()
        app.productCategory.topLinks.openCheckout();
        app.checkout.checkoutOptions.selectCheckoutOption('register');
        app.checkout.checkoutOptions.continue()
        app.checkout.accountAndBillingDetails.fillAccountAndBillingDetails({
            firstName: 'test',
            lastName: 'test',
            email: `test+${Date.now()}@test.com`,
            telephone: '123123123',
            address1: 'test',
            city: 'Mensk',
            postCode: '123123',
            country: 'Belarus',
            region: 'Horad Minsk',
            password: '123456'
        })
        app.checkout.accountAndBillingDetails.acceptPrivacyPolicy();
        app.checkout.accountAndBillingDetails.continue()
        app.checkout.deliveryDetails.continue();
        app.checkout.deliveryMethod.continue()
        app.checkout.paymentMethod.acceptTermsAndConditions()
        app.checkout.paymentMethod.continue()
        app.checkout.confirmOrder.confirm()
        browser.waitUntil(() => app.confirmation.isOpened(), {
            timeoutMsg: "Expected confirmation page to be loaded"
        })
    })
})