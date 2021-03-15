import { ConfirmationPage } from "../../../application/pages/checkout/confirmation.page";
import { CheckoutPage } from "../../../application/pages/checkout/index";
import { ProductCategoryPage } from "../../../application/pages/productCategory.page";

describe('item', function () {
    it('can be purchased', function () {
        const categoryPage = new ProductCategoryPage();
        categoryPage.open('/mp3-players');
        const iPodShuffle = categoryPage.products.find(product => product.title() == 'iPod Shuffle');
        expect(iPodShuffle).toBeDefined();

        iPodShuffle.addToCart();

        const checkoutPage = new CheckoutPage();

        checkoutPage.open();
        
        checkoutPage.checkoutOptions.selectGuestCheckout();
        checkoutPage.checkoutOptions.continue();

        checkoutPage.billingDetails.fillBillingDetails({
            firstName: 'test',
            lastName: 'test',
            email: `Test2${Date.now()}@example.com`,
            telephone: '1111111111',
            address1: 'test',
            city: 'test',
            postCode: 'test',
            country: 'Belarus',
            region: 'Horad Minsk'
        });
        checkoutPage.billingDetails.continue();

        checkoutPage.deliveryMethod.continue();

        checkoutPage.paymentMethod.acceptTermsAndConditions();
        checkoutPage.paymentMethod.continue();

        checkoutPage.confirmOrder.confirm();

        const confirmationPage = new ConfirmationPage();
        expect(confirmationPage.isOpened()).toEqual(true);
    })
});