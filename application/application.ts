import { ConfirmationPage } from "./pages/checkout/confirmation.page";
import { CheckoutPage } from "./pages/checkout/index";
import { HomePage } from "./pages/home/home.page";
import { ProductCategoryPage } from "./pages/productCategory.page";
import { RegistrationPage } from "./pages/registration/registration.page";
import { WishList } from "./pages/wishList.page";


export class App {
    home: HomePage
    productCategory: ProductCategoryPage
    checkout: CheckoutPage
    confirmation: ConfirmationPage
    registration: RegistrationPage;
    wishList: WishList;

    constructor() {
        this.home = new HomePage()
        this.productCategory = new ProductCategoryPage()
        this.checkout = new CheckoutPage()
        this.confirmation = new ConfirmationPage()
        this.registration = new RegistrationPage();
        this.wishList = new WishList();
    }
}