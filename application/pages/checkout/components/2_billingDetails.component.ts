import { ElementsHelper } from '../../../../helpers/elements.helper'

export class BillingDetailsComponent {
    protected get root(): WebdriverIO.Element {
        return $('div#collapse-payment-address').parentElement()
    }

    fillBillingDetails(data: {
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        address1: string,
        city: string,
        postCode: string,
        country: string,
        region: string
    }) {
        const firstNameInput = this.root.$('#input-payment-firstname')
        expect(firstNameInput).toBeClickable({
            wait: 5000,
            message:'First name input didn\'t appear'
        })
        this.root.$('#input-payment-firstname').setValue(data.firstName)
        this.root.$('#input-payment-lastname').setValue(data.lastName)
        this.root.$('#input-payment-email').setValue(data.email)
        this.root.$('#input-payment-telephone').setValue(data.telephone)
        this.root.$('#input-payment-address-1').setValue(data.address1)
        this.root.$('#input-payment-city').setValue(data.city)
        this.root.$('#input-payment-postcode').setValue(data.postCode)
        this.root.$('#input-payment-country').selectByVisibleText(data.country)
        browser.pause(500)
        this.root.$('#input-payment-zone').selectByVisibleText(data.region)
    }
    
    selectMyShippingAddressIsDifferentFromBilling() {
        const differentAddressCheckbox = $('input[type="checkbox"][name="shipping_address"]')
        ElementsHelper.setSwitcherToFalse(differentAddressCheckbox)
    }

    continue() {
        const continueButton = this.root.$('input#button-guest')
        expect(continueButton).toBeVisible({message:'Continue button didn\'t appear'})
        continueButton.click()
    }
}