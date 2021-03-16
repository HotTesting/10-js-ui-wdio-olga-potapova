export class deliveryDetails {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-shipping-address').parentElement();
    }

    selectNewOrExistingAddress(option: string) {
        const addressOption = this.root.$(`input[type="radio"][name="shipping_address"][value="${option}"]`)
        expect(addressOption).toBeVisible({message:'Address option didn\'t appear'});
        addressOption.click();
    }

    continue() {
        const continueButton = this.root.$('#button-shipping-address');
        expect(continueButton).toBeVisible({
            wait: 5000,
            message:'Continue button didn\'t appear'
        });
        continueButton.click();
    }
}