export class SuccessMessage {
    get message(): WebdriverIO.Element {
        const successMessage = $('div.alert-success')
        expect(successMessage).toBeVisible({
            wait: 5000,
            message: 'Success message isn\'t shown'
        })
        return successMessage
    }

    openWishListFromSuccessMessage() {
        const wishListLink = this.message.$('a[href*="wishlist"]')
        expect(wishListLink).toHaveTextContaining('wish list', {
            wait: 5000,
            message: 'Success message doesn\'t contain link to wish list'
        })
        wishListLink.click()
    }

    openCompareFromSuccessMessage() {
        const compareLink = this.message.$('a[href*="compare"]')
        expect(compareLink).toHaveTextContaining('product comparison', {
            wait: 5000,
            message: 'Success message doesn\'t contain link to comparison table'
        })
        compareLink.click()
    }

    openCartFromSuccessMessage() {
        const cartLink = this.message.$('a[href*="checkout/cart"]')
        expect(cartLink).toHaveTextContaining('shopping cart', {
            wait: 5000,
            message: 'Success message doesn\'t contain link to shopping cart'
        })
        cartLink.click()
    }
}