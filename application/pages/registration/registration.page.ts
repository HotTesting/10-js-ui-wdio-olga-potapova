export class RegistrationPage {
    private content: WebdriverIO.Element;
    constructor() {
        this.content = $('#content');
    }

    open() {
        browser.url('/index.php?route=account/register');
    }

    register(data: {
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string
    }) {
       
        const firstName = this.content.$('#input-firstname');
        expect(firstName).toBeDisplayed({
            wait: 5000,
            message: 'Continue button isn\'t shown on the page'
        })
        firstName.setValue(data.firstName);
        const lastName = this.content.$('#input-lastname');
        lastName.setValue(data.lastName);
        const email = this.content.$('#input-email');
        email.setValue(data.email);
        const phone = this.content.$('#input-telephone');
        phone.setValue(data.telephone);
        const password = this.content.$('#input-password');
        password.setValue(data.password);
        const passwordConfirm = this.content.$('#input-confirm');
        passwordConfirm.setValue(data.password);
        const policy = this.content.$('input[type="checkbox"][name="agree"]');
        policy.click();
        const continueButton = this.content.$('input[type="submit"][value="Continue"]');
        continueButton.click();
        const successMessage = this.content.$('h1');
        expect(successMessage).toHaveText('Your Account Has Been Created!', {
            wait: 5000,
            message: 'Success registration message isn\'t shown, probably a user isn\'t registered'
        })
    }
}