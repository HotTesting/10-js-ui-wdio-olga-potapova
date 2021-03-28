import { App } from "../../application/application"
import { DataHelper } from '../../helpers/data.helper'

beforeEach(function () {
    browser.deleteCookies()
})

describe('Contact us form', function () {
    it('must send messages to shop administration', function () {
        const app = new App()
        const dataHelper = new DataHelper()
        const user = dataHelper.getUser()
        app.contactUs.open()
        app.contactUs.fillForm({
            name: user.firstName,
            email: user.email,
            enquiry: 'Some message'
        })
        app.contactUs.submit()
        app.contactUs.continue()
        expect(browser).toHaveUrlContaining('route=common/home')
    })
})
