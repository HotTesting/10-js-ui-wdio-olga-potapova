export class CheckoutOptionsComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-checkout-option').parentElement();
    }

    selectCheckoutOption(option: string) {
        const GuestCheckoutRadio = this.root.$(`input[type="radio"][value="${option}"]`);
        expect(GuestCheckoutRadio).toBeClickable({
            wait: 5000, 
            message:'Radio for selecting checkout option (guest or registered) didn\'t appear'
        });
        GuestCheckoutRadio.click();
    }

    continue() {
        const continueButton = this.root.$('input[type="button"][value="Continue"]');
        expect(continueButton).toBeClickable({message:'Continue button didn\'t appear'});
        continueButton.click();
    }
}