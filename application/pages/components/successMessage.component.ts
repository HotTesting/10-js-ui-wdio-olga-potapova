export class SuccessMessage {
    get message(): WebdriverIO.Element {
        const successMessage = $('div.alert-success');
        expect(successMessage).toBeVisible({
            wait: 5000,
            message: 'Success message isn\'t shown'
        });
        return successMessage;
    }

    openWishListFromSuccessMessage() {
        const wishListLink = this.message.$('a[href*="wishlist"]');
        expect(wishListLink).toHaveTextContaining('wish list', {
            wait: 5000,
            message: 'Success message doesn\'t contain link to wish list'
        });
        wishListLink.click();
    }

    openCompareFromSuccessMessage() {
        const compareLink = this.message.$('a[href*="compare"]');
        expect(compareLink).toHaveTextContaining('product comparison', {
            wait: 5000,
            message: 'Success message doesn\'t contain link to comparison list'
        });
        compareLink.click();
    }
}