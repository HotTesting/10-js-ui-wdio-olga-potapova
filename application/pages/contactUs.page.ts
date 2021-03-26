export class ContactUsPage {
    private content: WebdriverIO.Element
    constructor() {
        this.content = $('#content')
    }

    open() {
        browser.url('/index.php?route=information/contact')
    }

    fillForm(data: {
        name: string,
        email: string,
        enquiry: string
    }) {
        const name = this.content.$('#input-name')
        expect(name).toBeVisible({
            message: 'Name input didn\'t appear'
        })
        name.setValue(data.name)

        const email = this.content.$('#input-email')
        expect(email).toBeVisible({
            message: 'Email input didn\'t appear'
        })
        email.setValue(data.email)

        const enquiry = this.content.$('#input-enquiry')
        expect(enquiry).toBeVisible({
            message: 'Enquiry input didn\'t appear'
        })
        enquiry.setValue(data.enquiry)
    }

    submit() {
        const submit = this.content.$('input[type="submit"]')
        expect(submit).toBeVisible({
            message: 'Email input didn\'t appear'
        })
        submit.click()
    }

    continue() {
        const continueButton = this.content.$('a.btn.btn-primary')
        expect(continueButton).toBeVisible({
            message: 'Continue button didn\'t appear'
        })
        continueButton.click()
    }
}