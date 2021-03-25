import { Radio } from '../elementsComponents/radio.component'

export class ReturnPage {
    private content: WebdriverIO.Element
    constructor() {
        this.content = $('#content')
    }

    open() {
        browser.url('/index.php?route=account/return/add')
    }

    fillUserInformation(user: {
        firstname: string,
        lastname: string,
        email: string,
        telephone: string,
    }) {
        const firstName = this.content.$('#input-firstname')
        expect(firstName).toBeVisible({
            message: 'First name input wasn\'t displayed'
        })
        firstName.setValue(user.firstname)
        const lastName = this.content.$('#input-lastname')
        lastName.setValue(user.lastname)
        const email = this.content.$('#input-email')
        email.setValue(user.email)
        const phone = this.content.$('#input-telephone')
        phone.setValue(user.telephone)
    }

    fillOrderInformation(order: {
        ID: string,
        date?: string
    }) {
        const orderID = this.content.$('#input-order-id')
        orderID.setValue(order.ID)
        const orderDate = this.content.$('#input-date-ordered')
        if (order.date) {
            orderDate.setValue(order.date)
        }
    }

    fillProductInformation(product: {
        name: string,
        code: string,
        reasonForReturned: string,
        isOpened: string
    }) {
        const productName = this.content.$('#input-product')
        expect(productName).toBeVisible({
            message: 'Product name input wasn\'t displayed'
        })
        productName.setValue(product.name)
        const productCode = this.content.$('#input-model')
        productCode.setValue(product.code)
        const reason = new Radio(this.content.$(`label*=${product.reasonForReturned}`).$('input'))
        reason.setToTrue()
        const isOpened = new Radio(this.content.$(`label*=${product.isOpened}`).$('input'))
        if(product.isOpened !== undefined /*yes or no is sent in data object */) {
            isOpened.setToTrue()
        }
    }

    submit() {
        const submit = this.content.$('input[type="submit"]')
        expect(submit).toBeVisible({
          message: 'Submit button input wasn\'t displayed'
        })
        submit.click()
    }

    get successMessages(): WebdriverIO.Element [] {
        return this.content.$$('p')
    }
}