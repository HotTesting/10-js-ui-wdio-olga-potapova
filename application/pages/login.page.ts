export class LoginPage {
    private emailSelector: string;
    private passwordSelector: string;
    private submitButtonSelector: string;
    private myAccountHeading: WebdriverIO.Element
    constructor() {
        this.emailSelector = 'input#input-email'
        this.passwordSelector = 'input#input-password'
        this.submitButtonSelector = 'input[type="submit"]'
        this.myAccountHeading = $('h2=My Account');
    }

    open() {
        browser.url('/index.php?route=account/login')
    }

    login(data: {
        email: string,
        password: string
    }) {
        const emailnput = $(this.emailSelector)
        expect(emailnput).toBeDisplayed({
            wait: 5000,
            message: 'Continue button isn\'t shown on the page'
        })
        emailnput.setValue(data.email)
        const passwordInput = $(this.passwordSelector)
        passwordInput.setValue(data.password)
        const submitButton = $(this.submitButtonSelector)
        submitButton.click()
        expect(this.myAccountHeading).toBeVisible({
            wait: 5000,
            message: 'User didn\'t land on My Account page. Probably they couldn\'t log into system'
        })
    }

    guickLogin(data: {
        email: string,
        password: string
    }) {
        browser.execute(`
            document.querySelector('${this.emailSelector}').value = '${data.email}';
            document.querySelector('${this.passwordSelector}').value = '${data.password}';
            document.querySelector('${this.submitButtonSelector}').click();
        `, data)
        expect(this.myAccountHeading).toBeVisible({
            wait: 5000,
            message: 'User didn\'t land on My Account page. Probably they couldn\'t log into system'
        })
    }
}