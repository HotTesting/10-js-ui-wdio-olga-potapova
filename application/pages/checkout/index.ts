import { CheckoutOptionsComponent } from "./components/1_checkoutOptions.component";
import { AccountAndBillingDetailsComponent } from "./components/a_2_accountAndBillingDetails";
import { BillingDetailsComponent } from "./components/2_billingDetails.component";
import { DeliveryMethodComponent } from "./components/4_deliveryMethod.component";
import { PaymentMethodComponent } from "./components/5_paymentMethod.component";
import { ConfirmOrderComponent } from "./components/6_confirmOrder.component";
import { deliveryDetails } from "./components/3_deliveryDetails.component";

//index.ts - if file is called index, all the folder can be imported like a file 
export class CheckoutPage {

    get checkoutOptions() {
        return new CheckoutOptionsComponent();
    }

    get billingDetails() {
        return new BillingDetailsComponent();
    }

    get accountAndBillingDetails() {
        return new AccountAndBillingDetailsComponent();
    }

    get deliveryDetails() {
        return new deliveryDetails();
    }

    get deliveryMethod() {
        return new DeliveryMethodComponent();
    }

    get paymentMethod() {
        return new PaymentMethodComponent();
    }

    get confirmOrder() {
        return new ConfirmOrderComponent()
    }

    open() {
        browser.url('/index.php?route=checkout/checkout');
    }
}