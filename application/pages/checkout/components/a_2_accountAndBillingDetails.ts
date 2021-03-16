import { BillingDetailsComponent } from "./2_billingDetails.component";

export class AccountAndBillingDetailsComponent extends BillingDetailsComponent {
    fillAccountAndBillingDetails(data: {
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        address1: string,
        city: string,
        postCode: string,
        country: string,
        region: string,
        password: string
    }) {
        this.fillBillingDetails({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            telephone: data.telephone,
            address1: data.address1,
            city: data.city,
            postCode: data.postCode,
            country: data.country,
            region: data.region
        })
        this.root.$('#input-payment-password').setValue(data.password);
        this.root.$('#input-payment-confirm').setValue(data.password);
    }

    acceptPrivacyPolicy() {
        const acceptCheckbox = $('input[type="checkbox"][name="agree"]');
        expect(acceptCheckbox).toBeVisible({message:'Accept Privacy Policy checkbox didn\'t appear'});
        acceptCheckbox.click();
    }

    continue() {
        const continueButton = this.root.$('input#button-register');
        expect(continueButton).toBeVisible({message:'Continue button didn\'t appear'});
        continueButton.click();
    }
}