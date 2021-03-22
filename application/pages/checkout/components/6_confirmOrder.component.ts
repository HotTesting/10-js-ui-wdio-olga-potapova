export class ConfirmOrderComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-checkout-confirm').parentElement()
    }

    confirm() {
        const continueButton = this.root.$('#button-confirm')
        expect(continueButton).toBeVisible({message:'Confirm button didn\'t appear'})
        continueButton.click()
    }
}