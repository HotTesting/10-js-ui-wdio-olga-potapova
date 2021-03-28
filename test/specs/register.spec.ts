import { App } from "../../../application/application"
import { DataHelper } from '../../../helpers/data.helper'

const dataHelper = new DataHelper()

beforeEach(function () {
    browser.deleteCookies()
})

describe('Registration', function () {
    it('should allow to register', () => {
        const app = new App()
        const user = dataHelper.getUser()
        app.registration.open()
        app.registration.register(user)
        expect(app.registration.successfulMessage).toHaveText('Your Account Has Been Created!', {
            wait: 5000,
            message: 'Success registration message isn\'t shown, probably a user isn\'t registered'
        })
    })
})