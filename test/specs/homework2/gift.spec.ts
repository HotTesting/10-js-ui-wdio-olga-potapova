import { App } from "../../../application/application"
import { DataHelper } from '../../../helpers/data.helper'

beforeEach(function () {
    browser.deleteCookies()
})


describe('Gift Certificate', function () {
    it('can be purchased', function () {
        const app = new App()
        const dataHelper = new DataHelper()
        const user = dataHelper.getUser()
        app.gift.open()
        app.gift.fillForm({
            _recipientName: user.firstName,
            _recipientEmail: user.email,
            _fromName: user.firstName,
            _fromEmail: user.email,
            _reason: "Christmas"
        })
        expect(app.gift.successHeading).toHaveText('Purchase a Gift Certificate')
        expect(app.gift.successfulMessage).toHaveText('This gift certificate will be emailed to the recipient after your order has been paid for.')
    })
})