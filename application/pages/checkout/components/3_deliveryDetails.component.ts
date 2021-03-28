export class deliveryDetails {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-shipping-address').parentElement()
    }

    selectNewOrExistingAddress(option: string) {
        const addressOption = this.root.$(`input[type="radio"][name="shipping_address"][value="${option}"]`)
        expect(addressOption).toBeVisible({message:'Address option didn\'t appear'})
        addressOption.click()
    }

    fillShippingAddress(data: {
        firstName: string,
        lastName: string,
        address1: string,
        city: string,
        postCode: string,
        country: string,
        region: string
    }) {
        const firstNameInput = this.root.$('#input-shipping-firstname')
        expect(firstNameInput).toBeClickable({
            wait: 5000,
            message:'First name input didn\'t appear'
        })
        this.root.$('#input-shipping-firstname').setValue(data.firstName)
        this.root.$('#input-shipping-lastname').setValue(data.lastName)
        this.root.$('#input-shipping-address-1').setValue(data.address1)
        this.root.$('#input-shipping-city').setValue(data.city)
        this.root.$('#input-shipping-postcode').setValue(data.postCode)
        this.root.$('#input-shipping-country').selectByVisibleText(data.country)
        expect(this.root.$('#input-shipping-zone').$(`option*=${data.region}`)).toBeExisting()
        this.root.$('#input-shipping-zone').selectByVisibleText(data.region)
    }

    continue() {
        browser.pause(500)
        const continueButton = this.root.$('#button-shipping-address')
        expect(continueButton).toBeVisible({
            wait: 5000,
            message:'Continue button didn\'t appear'
        })
        continueButton.click()
    }

    continueForGuest() {
        browser.pause(500)
        const continueButton = this.root.$('#button-guest-shipping')
        expect(continueButton).toBeVisible({
            wait: 5000,
            message:'Continue button didn\'t appear'
        })
        continueButton.click()
    }
}