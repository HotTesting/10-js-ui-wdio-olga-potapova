import { ApiClient } from "../../api/apiClient";
//const cookie = require('cookie');

export class RegistrationPage {
    private content: WebdriverIO.Element;
    constructor() {
        this.content = $('#content')
    }

    get successfulMessage() : WebdriverIO.Element {
        return this.content.$('h1')
    }

    open() {
        browser.url('/index.php?route=account/register')
    }

    register(data: {
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string
    }) {

        const firstName = this.content.$('#input-firstname')
        expect(firstName).toBeDisplayed({
            wait: 5000,
            message: 'Continue button isn\'t shown on the page'
        })
        firstName.setValue(data.firstName)
        const lastName = this.content.$('#input-lastname')
        lastName.setValue(data.lastName)
        const email = this.content.$('#input-email')
        email.setValue(data.email)
        const phone = this.content.$('#input-telephone')
        phone.setValue(data.telephone)
        const password = this.content.$('#input-password')
        password.setValue(data.password)
        const passwordConfirm = this.content.$('#input-confirm')
        passwordConfirm.setValue(data.password)
        const policy = this.content.$('input[type="checkbox"][name="agree"]')
        policy.click()
        const continueButton = this.content.$('input[type="submit"][value="Continue"]')
        continueButton.click()
    }

    registerViaApi(data: {
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        agree: string,
        newsletter: string
    }) {
        const api = new ApiClient();
        const response = api.registerNewUserViaAPI(data);
        
        /*const cookieString = response.headers.get('Set-Cookie');
        const cookiesObject = cookie.parse(cookieString);
        console.log(cookieString);
        console.log(cookiesObject['OCSESSID'])
        browser.setCookies([
            {
                name: 'OCSESSID',
                value: cookiesObject['OCSESSID']
            }
        ])*/
    }

    registerAndLogin(data: {
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        agree: string,
        newsletter: string
    }) {
        const api = new ApiClient();
        api.registerAndLoginBrowserRequest(data);
        //browser.refresh(); //whyyyyy, whyyyy it doesn't woooooork
        //TO DO: 
        /*
        - browser refresh
        - open menu and expect that user is logged in
        */
    }
}