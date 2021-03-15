export class DeliveryMethodComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-shipping-method').parentElement();
    }

    continue() {
        const continueButton = this.root.$('#button-shipping-method');
        expect(continueButton).toBeVisible({message:'Continue button didn\'t appear'});
        continueButton.click();
    }
}