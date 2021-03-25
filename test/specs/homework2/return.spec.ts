import { App } from "../../../application/application"
import { DataHelper } from '../../../helpers/data.helper'

const dataHelper = new DataHelper()

beforeEach(function () {
    browser.deleteCookies()
})

describe('Product return', function () {
    it('can be submited', function () {
        const app = new App()
        const user = dataHelper.getUser()
        app.return.open()
        app.return.fillUserInformation(
            {
                firstname: 'string',
                lastname: 'string',
                email: 'string@example.com',
                telephone: 'string',
            }
        )
        app.return.fillOrderInformation({
            ID: '1111',
        })
        app.return.fillProductInformation({
            name: 'test',
            code: 'test',
            reasonForReturned: 'Faulty, please supply details',
            isOpened: 'Yes'
        })
        app.return.submit()
        expect(app.return.successMessages[0]).toHaveText('Thank you for submitting your return request. Your request has been sent to the relevant department for processing.')
        expect(app.return.successMessages[1]).toHaveText('You will be notified via e-mail as to the status of your request.')
    })
})