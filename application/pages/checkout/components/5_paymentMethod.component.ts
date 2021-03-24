import { CheckBox } from "../../../basicComponents/checkbox.component"

export class PaymentMethodComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-payment-method').parentElement()
    }
    
    acceptTermsAndConditions() {
        const checkbox = new CheckBox(this.root.$('input[type="checkbox"][name="agree"]'))
        checkbox.setToTrue()
    }

    continue() {
        const continueButton = this.root.$('#button-payment-method')
        expect(continueButton).toBeVisible({message:'Continue button didn\'t appear'})
        continueButton.click()
    }
}