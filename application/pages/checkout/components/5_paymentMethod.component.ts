import { ElementsHelper } from '../../../../helpers/elements.helper'

export class PaymentMethodComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-payment-method').parentElement()
    }
    
    acceptTermsAndConditions() {
        const checkbox = this.root.$('input[type="checkbox"][name="agree"]')
        ElementsHelper.setSwitcherToTrue(checkbox)
    }

    continue() {
        const continueButton = this.root.$('#button-payment-method')
        expect(continueButton).toBeVisible({message:'Continue button didn\'t appear'})
        continueButton.click()
    }
}