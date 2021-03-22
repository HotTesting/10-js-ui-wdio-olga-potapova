export class DeliveryMethodComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-shipping-method').parentElement()
    }

    continue() {
        const continueButton = this.root.$('#button-shipping-method')
        expect(continueButton).toBeClickable({
            message:'Continue button didn\'t appear',
            wait: 5000
        })
        continueButton.click()
    }
}