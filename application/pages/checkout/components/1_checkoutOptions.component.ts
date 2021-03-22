import { ElementsHelper } from '../../../../helpers/elements.helper'

export class CheckoutOptionsComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-checkout-option').parentElement()
    }

    selectCheckoutOption(option: string) {
        const GuestOrRegisterCheckoutRadio = this.root.$(`input[type="radio"][value="${option}"]`)
        ElementsHelper.setSwitcherToTrue(GuestOrRegisterCheckoutRadio)
    }

    continue() {
        browser.pause(1000) //didn't find what type of wait should be here - button is somehow changed after RB above click
        const continueButton = this.root.$('input[type="button"][value="Continue"]')
        expect(continueButton).toBeClickable({
            wait: 5000,
            message:'Continue button didn\'t appear'
        })
        continueButton.click()
    }
}