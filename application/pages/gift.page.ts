import { CheckBox } from '../elementsComponents/checkbox.component'
import { Radio } from '../elementsComponents/radio.component'

export class GiftSertificatePage {
    private content: WebdriverIO.Element
    constructor() {
        this.content = $('#content')
    }

    open() {
        browser.url('/index.php?route=account/voucher')
    }
    
    fillForm(data: {
        _recipientName: string,
        _recipientEmail: string,
        _fromName: string,
        _fromEmail: string,
        _reason: string
    }) {
        const recipientName = this.content.$('[name="to_name"]')
        expect(recipientName).toBeVisible({
          message: 'recipient name input wasn\'t displayed'
        })
        recipientName.setValue(data._recipientName)

        const recipientEmail = this.content.$('#input-to-email')
        expect(recipientEmail).toBeVisible({
          message: 'Recipient email input wasn\'t displayed'
        })
        recipientEmail.setValue(data._recipientEmail)

        const fromName = this.content.$('#input-from-name')
        expect(fromName).toBeVisible({
          message: 'From name input wasn\'t displayed'
        })
        fromName.setValue(data._fromName)

        const fromEmail = this.content.$('#input-from-email')
        expect(fromEmail).toBeVisible({
          message: 'From email input wasn\'t displayed'
        })
        fromEmail.setValue(data._fromEmail)

        const reason = new Radio(this.content.$(`label*=${data._reason}`).$('input'))
        reason.setToTrue()

        const agreeToNotRefundable = new CheckBox(this.content.$('[type="checkbox"]'))
        agreeToNotRefundable.setToTrue()
    }

    submit(){
        const submit = this.content.$('input[type="submit"]')
        expect(submit).toBeVisible({
          message: 'Submit button wasn\'t displayed'
        })
        submit.click()
    }

    get successHeading(): WebdriverIO.Element {
        return this.content.$('h1')
    }

    get successfulMessage(): WebdriverIO.Element {
        return this.content.$('#content p')
    }
    
}