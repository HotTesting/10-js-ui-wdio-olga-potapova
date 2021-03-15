export class PaymentMethodComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-payment-method').parentElement();
    }
    
    acceptTermsAndConditions() {
        const checkbox = this.root.$('input[type="checkbox"][name="agree"]');
        expect(checkbox).toBeVisible({message:'terms and conditions checkbox isn\'t appeared'});
        checkbox.click();
    }

    continue() {
        const continueButton = this.root.$('#button-payment-method');
        expect(continueButton).toBeVisible({message:'Continue button didn\'t appear'});
        continueButton.click();
    }
}