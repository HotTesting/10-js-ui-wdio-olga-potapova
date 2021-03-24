import { Radio } from '../../../basicComponents/radio.component'

export class CheckoutOptionsComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-checkout-option').parentElement()
    }

    selectCheckoutOption(option: string) {
        const GuestOrRegisterCheckoutRadio = new Radio(this.root.$(`input[type="radio"][value="${option}"]`))
        GuestOrRegisterCheckoutRadio.setToTrue()
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