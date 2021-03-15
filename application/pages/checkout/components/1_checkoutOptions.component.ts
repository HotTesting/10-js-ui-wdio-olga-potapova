export class CheckoutOptionsComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-checkout-option').parentElement();
    }

    selectGuestCheckout() {
        const GuestCheckoutRadio = this.root.$('input[type="radio"][value="guest"]');
        expect(GuestCheckoutRadio).toBeClickable({
            wait: 5000, 
            message:'Guest radio didn\'t appear'
        });
        GuestCheckoutRadio.click();
    }

    continue() {
        const continueButton = this.root.$('input[type="button"][value="Continue"]');
        expect(continueButton).toBeClickable({message:'Continue button didn\'t appear'});
        continueButton.click();
    }
}